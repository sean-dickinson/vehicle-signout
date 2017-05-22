import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import { FirebaseListObservable } from 'angularfire2/database';
import { vehicleInUse, timeTravelCheck } from '../vehicle-in-use.directive';
import { SignoutDataService } from '../signout-data.service';
@Component({
  selector: 'add-signout-dialog',
  templateUrl: './add-signout-dialog.component.html',
  styleUrls: ['./add-signout-dialog.component.css']
})
export class AddSignoutDialogComponent {
 vehicleNames: FirebaseListObservable<any[]>;
 signOuts: FirebaseListObservable<any[]>;
 signList: any[];
// signOuts: any[];
 tabIndex: number;
 canSave: boolean;
 departingDate: Date;
 returningDate: Date;
 signOutForm: FormGroup;
 purpose: string;
 currentDate: Date;
 errorDict: any;
//  vehicleCtrl: FormControl;
 constructor(@Inject(MD_DIALOG_DATA) public data: any,
             private sds: SignoutDataService,
             private fb: FormBuilder) {
   this.vehicleNames = this.sds.getVehicleNames();
   this.tabIndex = 0;
   this.canSave = false;
   this.currentDate = new Date();
   let now = new Date();
   let later = new Date();
   later.setHours(later.getHours() + 1);
   this.signOuts = this.sds.getSignouts(data.currentVehicle);
    this.signOutForm = this.fb.group({
      vehicle: [data.currentVehicle, Validators.required],
      purpose: '',
      departing: [now, [Validators.required], [vehicleInUse(this.signOuts)]],
      returning: [later, [Validators.required], [vehicleInUse(this.signOuts)]]
    }, {validator: timeTravelCheck('departing', 'returning')});
    this.errorDict = {
      vehicleInUse: 'Vehicle is in use at that time',
      required: 'This field is required',
      outBeforeIn: 'Time travel is not allowed'
    };
    this.signOutForm.controls['vehicle'].valueChanges.subscribe((val)=>{
      this.signOuts = this.sds.getSignouts(data.currentVehicle);
    });
  
  }

  
  save(){
    this.sds.saveSignout(this.signOutForm.controls['vehicle'].value, 
                         this.signOutForm.controls['purpose'].value,
                         this.signOutForm.controls['departing'].value,
                         this.signOutForm.controls['returning'].value );
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
