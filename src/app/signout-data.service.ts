import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/distinctUntilChanged'

@Injectable()
export class SignoutDataService {

  constructor(private db:AngularFireDatabase, private auth: AngularFireAuth) { }

  getSignouts(vehicle:string, currentTime:BehaviorSubject<string>):FirebaseListObservable<any[]>{
   return this.db.list(`/vehicles/${vehicle}/`, {
     query:{
              orderByChild: 'departing',
              startAt: currentTime
            }});

  }

  getLastSignout(vehicle:string, currentTime:BehaviorSubject<string>):FirebaseListObservable<any[]>{
   return this.db.list(`/vehicles/${vehicle}/`, {
     query:{
              orderByChild: 'departing',
              endAt: currentTime,
              limitToLast: 1
            }});
        
  }

  getAllSignouts(vehicle:string, datestring:string):FirebaseListObservable<any[]>{
    return this.db.list(`/vehicles/${vehicle}/`, {query:{
      orderByChild: 'returning',
      startAt: datestring
    }});
  }
  getUserSignouts():FirebaseListObservable<any[]>{
    let date = new Date();
    date.setTime(date.getTime() - 1000*60*10);
    let dayString = date.toISOString();
    let name = this.auth.auth.currentUser.displayName;
    return this.db.list(`/users/${name}/`, {query:{
      orderByChild: 'returning',
      startAt: dayString
    }
  });
  }

  getVehicleNames():FirebaseListObservable<any[]>{
    return this.db.list('/vehicleNames/');
  }

  saveSignout(vehicle:string, purpose:string, departing:Date, returning:Date, key:string){
    let now = new Date();
    let obj:any = {};
    obj.departing = departing.toISOString();
    obj.returning = returning.toISOString();
    obj.purpose = purpose;
    obj.name = this.auth.auth.currentUser.displayName;
    if(key){
      this.db.object(`/vehicles/${vehicle}/${key}/`).update(obj);
      this.db.object(`/users/${obj.name}/${key}`).update(obj);
    }
    else{
       let test = this.db.list(`/vehicles/${vehicle}/`).push(obj);
       obj.vehicle = vehicle;
       this.db.object(`/users/${obj.name}/${test.key}`).update(obj);
    }
  }

  deleteSignout(key:string, vehicle:string, name:string){
    let updates:any = {};
    updates[`/vehicles/${vehicle}/${key}/`] = null;
    updates[`/users/${name}/${key}/`] = null;
    this.db.object('/').update(updates);
  }

  getAuth(){
    return this.auth.authState;
  }


  login(){
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    return this.auth.auth.signOut();
  }

  tempRemove(vehicle:string, key:string){
    this.db.object(`/vehicles/${vehicle}/${key}`).remove();
  }
}
