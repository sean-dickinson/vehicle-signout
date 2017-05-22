import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class SignoutDataService {

  constructor(private db:AngularFireDatabase, private auth: AngularFireAuth) { }

  getSignouts(vehicle:string):FirebaseListObservable<any[]>{
    return this.db.list(`/vehicles/${vehicle}/`, {query:{
      orderByChild: 'departing'
    }});
  }

  getVehicleNames():FirebaseListObservable<any[]>{
    return this.db.list('/vehicleNames/');
  }

  saveSignout(vehicle:string, purpose:string, departing:Date, returning:Date){
    let obj:any = {};
    obj.departing = departing.toISOString();
    obj.returning = returning.toISOString();
    obj.purpose = purpose;
    obj.name = this.auth.auth.currentUser.displayName;
    this.getSignouts(vehicle).push(obj);
  }

  getAuth(){
    return this.auth.authState;
  }

  login(){
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
}
