import { Injectable } from '@angular/core';
import { VehicleUser } from './models/vehicle-user';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<VehicleUser> = new BehaviorSubject<VehicleUser>(null);
  constructor(private af: AngularFirestore) { }

  getUser(): BehaviorSubject<VehicleUser> {
    return this._user;
  }

  setUser(uid: string): Promise<void>{
    return this.af.doc(`/users/${uid}`).valueChanges().toPromise()
      .then((user: VehicleUser) => {
        this._user.next(user);
      });
  }

  logoutUser(): void {
    this._user.next(null);
  }
}
