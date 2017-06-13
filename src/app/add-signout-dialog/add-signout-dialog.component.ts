import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import { FirebaseListObservable } from 'angularfire2/database';
import { vehicleInUse, timeTravelCheck } from '../vehicle-in-use.directive';
import { SignoutDataService } from '../signout-data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'add-signout-dialog',
  templateUrl: './add-signout-dialog.component.html',
  styleUrls: ['./add-signout-dialog.component.css']
})
export class AddSignoutDialogComponent implements OnDestroy {
 vehicleNames: FirebaseListObservable<any[]>;
 signOuts: FirebaseListObservable<any[]>;
 signList: any[];
 tabIndex: number;
 canSave: boolean;
 departingDate: Date;
 returningDate: Date;
 signOutForm: FormGroup;
 purpose: string;
 currentDate: Date;
 errorDict: any;
 key: string;
 subscriptions: Subscription[];
//  vehicleCtrl: FormControl;
 constructor(@Inject(MD_DIALOG_DATA) public data: any,
             private sds: SignoutDataService,
             private fb: FormBuilder) {
   this.vehicleNames = this.sds.getVehicleNames();
   this.tabIndex = 0;
   this.canSave = false;
   this.currentDate = new Date();
   let now = data.departTime;
   let later = data.returnTime;
   this.signOuts = this.sds.getAllSignouts(data.currentVehicle, this.currentDate.toISOString());
    this.signOutForm = this.fb.group({
      vehicle: [data.currentVehicle, Validators.required],
      purpose: data.purpose,
      departing: [now, [Validators.required], [vehicleInUse(this.signOuts)]],
      returning: [later, [Validators.required], [vehicleInUse(this.signOuts)]]
    }, {validator: timeTravelCheck('departing', 'returning')});
    this.errorDict = {
      vehicleInUse: 'Vehicle is in use at that time',
      required: 'This field is required',
      outBeforeIn: 'Time travel is not allowed'
    };
    this.subscriptions.push(this.signOutForm.controls['vehicle'].valueChanges.subscribe((val)=>{
      this.signOuts = this.sds.getAllSignouts(val, this.currentDate.toISOString());
      this.signOutForm.controls['departing'].setAsyncValidators(vehicleInUse(this.signOuts));
      this.signOutForm.controls['returning'].setAsyncValidators(vehicleInUse(this.signOuts));
      this.signOutForm.controls['departing'].markAsPristine();
      this.signOutForm.controls['returning'].markAsPristine();
      this.signOutForm.controls['departing'].updateValueAndValidity();
      this.signOutForm.controls['returning'].updateValueAndValidity();
    }));

    this.subscriptions.push(this.signOutForm.controls['departing'].valueChanges.subscribe((val)=>{
      let date = new Date(val);
      date.setHours(date.getHours() + 1);
      this.signOutForm.controls['returning'].setValue(date);
    }));
  
  }

  ngOnDestroy(){
    for(let sub in this.subscriptions){
      this.subscriptions[sub].unsubscribe();
    }
  }

  
  save(){
    this.sds.saveSignout(this.signOutForm.controls['vehicle'].value, 
                         this.signOutForm.controls['purpose'].value,
                         this.signOutForm.controls['departing'].value,
                         this.signOutForm.controls['returning'].value,
                         this.data.key );
  }

  cancel(){
    if(this.data.key){
      this.sds.saveSignout(this.data.currentVehicle,
                           this.data.purpose,
                           this.data.departTime,
                           this.data.returnTime,
                           this.data.key
                           );
      }
    }

  getErrMessage(key:string){
    let errObj = this.signOutForm.controls[key].errors;
    if(errObj){
        let error = Object.keys(errObj)[0];
        return this.errorDict[error];
    }
    
    else if (this.signOutForm.hasError('outBeforeIn')){
      return this.errorDict['outBeforeIn'];
    }
    return null;
  }

  nextTab(){
    if(this.tabIndex < 2){
      this.tabIndex += 1;
    }
  }


}
