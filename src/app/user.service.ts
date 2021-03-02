import { Injectable } from '@angular/core';
import { VehicleUser } from './vehicle-user';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<VehicleUser> = new BehaviorSubject<VehicleUser>(null);
  constructor() { }

  getUser(): BehaviorSubject<VehicleUser> {
    return this._user;
  }

  setUser(user: VehicleUser): void{
    this._user.next(user);
  }

  logoutUser(): void {
    this._user.next(null);
  }
}
