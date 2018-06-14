import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, AsyncValidatorFn, Validators, Validator, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

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

export function overlapCheck(startGroup: FormGroup, signoutList:Observable<any[]>):AsyncValidatorFn {
  return (g: FormGroup) =>{
    let startDateTime = getDate(startGroup.get('date').value, startGroup.get('time').value);
    let endDateTime = getDate(g.get('date').value,g.get('time').value);
    if(!(startDateTime && endDateTime)){
      return null
    }
    return signoutList.pipe(
      map(val=>{
      let obj = null;
      val.forEach(signOut=>{
        let departing = new Date(signOut.departing);
        let returning  = new Date(signOut.returning);
        if(startDateTime <= departing && endDateTime >= returning){
          obj = {
                vehicleInUse: {
                  valid: false,
                  invalid: true
                  }
                }
        }
      });
      return obj
    }),
    first()
  )
  }
}

export function vehicleInUse(signoutList:Observable<any[]>):AsyncValidatorFn {
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
    return signoutList.pipe(
      map((val:any[])=>{
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
      return obj
       
    }),
    first()
    )
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



