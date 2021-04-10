import { Injectable, OnDestroy } from '@angular/core';
import { VehicleUser } from '../../models/vehicle-user';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private _user: ReplaySubject<VehicleUser> = new ReplaySubject<VehicleUser>(1);
  private authSub: Subscription;
  constructor(private af: AngularFirestore, private auth: AngularFireAuth) {
    this.authSub = this.auth.user.subscribe(user => {
      if (user) {
        this.setUser(user.uid);
      } else {
        this.logoutUser();
      }
    })
  }

  getUser(): Observable<VehicleUser> {
    return this._user;
  }

  setUser(uid: string): Promise<void> {
    return this.af.doc(`/users/${uid}`).valueChanges().pipe(take(1)).toPromise()
      .then((user: VehicleUser) => {
        this._user.next(user);
      });
  }

  logoutUser(): Promise<void> {
    return this.auth.signOut();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
