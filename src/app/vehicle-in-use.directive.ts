import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validators, Validator, FormGroup } from '@angular/forms';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';


export function timeTravelCheck(departingKey:string, returningKey:string){
  return (group: FormGroup): {[key: string]: any} => {
    if (group.controls[departingKey].value >= group.controls[returningKey].value){
      return {
        outBeforeIn:true
      }
    }
    else {
      return null;
    }
  }
};

export function vehicleInUse(signoutList:FirebaseListObservable<any[]>):ValidatorFn {
  return (control: AbstractControl)=> {
    const dateTime = new Date(control.value);
    return signoutList.map(val=>{
      let obj = null;
      val.forEach(signOut=>{
      let departing = new Date(signOut.departing);
      let returning  = new Date(signOut.returning);
      if(dateTime >= departing && dateTime <= returning){
        obj = {
          vehicleInUse: {
            valid: false,
            invalid: true
          }
        };
      }; 
    });
    if(obj){
      return obj
    }
    return null; 
    }).first();
  }
}

@Directive({
  selector: '[vehicleInUse]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => VehicleInUseDirective), multi: true}]
})

export class VehicleInUseDirective implements Validator, OnChanges{
  @Input('vehicleInUse') signOuts: FirebaseListObservable<any[]>;
  private valFn = Validators.nullValidator;

  ngOnInit(){
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.signOuts){
      this.valFn = vehicleInUse(this.signOuts)
    }
    else{
      this.valFn = Validators.nullValidator;
    }
  }
 
  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}


