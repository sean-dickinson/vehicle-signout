import { Component, OnInit, Inject, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
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
export class AddSignoutDialogComponent {
 vehicleNames: FirebaseListObservable<any[]>;
 signOuts: FirebaseListObservable<any[]>;
 signList: any[];
 tabIndex: number;
 canSave: boolean;
 signOutForm: FormGroup;
 departGroup: FormGroup;
 returnGroup: FormGroup;
 purpose: string;
 currentDate: Date;
 errorDict: any;
 key: string;
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
   this.departGroup = this.fb.group({
      date: new FormControl(now, [Validators.required]),
      time: new FormControl(this.getTimeString(now), [Validators.required])},
      {asyncValidator: vehicleInUse(this.signOuts)}
    );
  this.returnGroup = this.fb.group({
    date: new FormControl(later, [Validators.required]),
    time: new FormControl(this.getTimeString(later), [Validators.required])
    }, {validator: timeTravelCheck(this.departGroup), asyncValidator: vehicleInUse(this.signOuts)});
  this.signOutForm = this.fb.group({
    vehicle: new FormControl(data.currentVehicle, [Validators.required]),
    purpose: new FormControl(data.purpose),
    departing: [this.departGroup],
    returning: new FormControl(this.returnGroup)
    });
    
    this.signOutForm.controls['vehicle'].valueChanges.subscribe((val)=>{
      this.signOuts = this.sds.getAllSignouts(val, this.currentDate.toISOString());
      this.departGroup.setAsyncValidators(vehicleInUse(this.signOuts));
      this.returnGroup.setAsyncValidators(vehicleInUse(this.signOuts));
      this.departGroup.controls['time'].markAsPristine();
      this.returnGroup.controls['time'].markAsPristine();
      this.departGroup.controls['time'].updateValueAndValidity();
      this.returnGroup.controls['time'].updateValueAndValidity();
    });
    
  }

  enableSave(change:SimpleChange){
    this.canSave = true;
  }
  
  save(){
    this.sds.saveSignout(this.signOutForm.controls['vehicle'].value, 
                         this.signOutForm.controls['purpose'].value,
                         this.getDateString(this.departGroup),
                          this.getDateString(this.returnGroup),
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

  errorGroupMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean{
    return control.parent.invalid || control.invalid;
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

  getTimeString(date:Date){
    let hours = date.getHours() >= 9 ? `${date.getHours()}` : `0${date.getHours()}`;
    let minutes = date.getMinutes() >= 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
    return `${hours}:${minutes}`;
  }

  getDateString(fg: FormGroup): string{
    let date:Date = fg.value.date;
    let timeString = fg.value.time;
    let hours:number = parseInt(timeString.substr(0, 2));
    let minutes:number = parseInt(timeString.substr(3, 2));
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toISOString();

  }
  
}
