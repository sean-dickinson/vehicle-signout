import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, AsyncValidatorFn, Validators, Validator, FormGroup } from '@angular/forms';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';


export function timeTravelCheck(departGroup: FormGroup){
  return (returnGroup: FormGroup): {[key: string]: any} => {
    let departDate = getDate(departGroup.get('date').value, departGroup.get('time').value);
    let returnDate =  getDate(returnGroup.get('date').value, returnGroup.get('time').value);
    if (departDate >= returnDate){
      return {
        outBeforeIn:true
      }
    }
    else {
      return null;
    }
  }
};

export function vehicleInUse(signoutList:FirebaseListObservable<any[]>):AsyncValidatorFn {
  return (g: FormGroup)=> {
    let dateTime = g.get('date').value;
    if(!dateTime){
      return null;
    }
    let timeString = g.get('time').value;
    let hours:number = parseInt(timeString.substr(0, 2));
    let minutes:number = parseInt(timeString.substr(3, 2));
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);
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

function getDate(date:Date, timeString:string){
  let dateTime = new Date(date);
  let hours:number = parseInt(timeString.substr(0, 2));
  let minutes:number = parseInt(timeString.substr(3, 2));
  dateTime.setHours(hours);
  dateTime.setMinutes(minutes);
  return dateTime;
}



