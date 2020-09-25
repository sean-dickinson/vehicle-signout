import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from "rxjs";
import { map, switchMap } from 'rxjs/operators'

@Injectable()
export class SignoutDataService {

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) { }

  getSignouts(vehicle: string, currentTime: BehaviorSubject<string>): Observable<any[]> {
    return currentTime.pipe(
      switchMap(time =>
        this.db.list(`/vehicles/${vehicle}`, ref => ref.orderByChild('departing').startAt(time))
          .snapshotChanges()
      ),
      map(actions => actions.map(action =>
        ({ $key: action.payload.key, ...action.payload.val() })
      )
      )
    )
  }

  getLastSignout(vehicle: string, $currentTime: BehaviorSubject<string>): Observable<any[]> {
    return $currentTime.pipe(
      switchMap(
        currentTime => this.db.list(`/vehicles/${vehicle}/`, ref => ref.orderByChild('departing').endAt(currentTime).limitToLast(1)).valueChanges()
      )
    )

  }

  getAllSignouts(vehicle: string, datestring: string): Observable<any[]> {
    return this.db.list(`/vehicles/${vehicle}/`, ref => ref.orderByChild('returning').startAt(datestring)).snapshotChanges()
      .pipe(
        map(actions => actions.map(action =>
          ({ $key: action.payload.key, ...action.payload.val() })
        )
        )
      );
  }
  getUserSignouts(): Observable<any[]> {
    let date = new Date();
    date.setTime(date.getTime() - 1000 * 60 * 10);
    let dayString = date.toISOString();
    let name = this.auth.auth.currentUser.displayName;
    return this.db.list(`/users/${name}/`, ref => ref.orderByChild('returning').startAt(dayString)).snapshotChanges()
      .pipe(
        map(actions => actions.map(action =>
          ({ $key: action.payload.key, ...action.payload.val() })
        )
        )
      );
  }

  getVehicleNames(): Observable<any[]> {
    return this.db.list('/vehicleNames/').snapshotChanges()
      .pipe(
        map(actions => actions.map(action =>
          ({ $key: action.payload.key, ...action.payload.val() })
        )
        )
      );
  }

  saveSignout(vehicle: string, purpose: string, departing: string, returning: string, key: string) {
    let now = new Date();
    let obj: any = {};
    obj.departing = departing;
    obj.returning = returning;
    obj.purpose = purpose;
    obj.name = this.auth.auth.currentUser.displayName;
    if (key) {
      this.db.object(`/vehicles/${vehicle}/${key}/`).update(obj);
      this.db.object(`/users/${obj.name}/${key}`).update(obj);
    }
    else {
      let test = this.db.list(`/vehicles/${vehicle}/`).push(obj);
      obj.vehicle = vehicle;
      this.db.object(`/users/${obj.name}/${test.key}`).update(obj);
    }
  }

  deleteSignout(key: string, vehicle: string, name: string) {
    let updates: any = {};
    updates[`/vehicles/${vehicle}/${key}/`] = null;
    updates[`/users/${name}/${key}/`] = null;
    this.db.object('/').update(updates);
  }

  getAuth() {
    return this.auth.authState;
  }


  login() {
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.auth.auth.signOut();
  }

  tempRemove(vehicle: string, key: string) {
    this.db.object(`/vehicles/${vehicle}/${key}`).remove();
  }
}
