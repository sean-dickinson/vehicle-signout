import { Injectable } from '@angular/core';
import { VehicleUser } from './models/vehicle-user';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: ReplaySubject<VehicleUser> = new ReplaySubject<VehicleUser>(1);
  constructor(private af: AngularFirestore) { 
    this._user.next(null);
  }

  getUser(): Observable<VehicleUser> {
    return this._user;
  }

  setUser(uid: string): Promise<void>{
    return this.af.doc(`/users/${uid}`).valueChanges().pipe(take(1)).toPromise()
      .then((user: VehicleUser) => {
        this._user.next(user);
      });
  }

  logoutUser(): void {
    this._user.next(null);
  }
}
