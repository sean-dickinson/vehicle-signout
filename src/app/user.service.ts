import { Injectable } from '@angular/core';
import { VehicleUser } from './vehicle-user';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<VehicleUser> = new BehaviorSubject<VehicleUser>(null);
  constructor(private rtdb: AngularFireDatabase) { }

  getUser(): BehaviorSubject<VehicleUser> {
    return this._user;
  }

  setUser(uid: string): Promise<void>{
    return this.rtdb.object(`/users/${uid}`).valueChanges().toPromise()
      .then((user: VehicleUser) => {
        this._user.next(user);
      });
  }

  logoutUser(): void {
    this._user.next(null);
  }
}
