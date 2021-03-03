import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable, BehaviorSubject, of, Subject } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Vehicle } from "./models/vehicle";
import { VehicleSignout } from "./models/vehicle-signout";
import { VehicleUser } from "./models/vehicle-user";

@Injectable({
  providedIn: "root",
})
export class SignoutDataService {
  constructor(private db: AngularFireDatabase) {}

  getSignoutsByVehicle(
    vehicleID: string,
    currentTime$: Subject<string>
  ): Observable<VehicleSignout[]> {
    return currentTime$.pipe(
      switchMap((time) =>
        this.db
          .list(`/vehicleSignouts/${vehicleID}`, (ref) =>
            ref.orderByChild("departing").startAt(time)
          )
          .valueChanges()
      )
    ) as Observable<VehicleSignout[]>;
  }

  getLastSignout(
    vehicleID: string,
    currentTime$: Subject<string>
  ): Observable<VehicleSignout> {
    return currentTime$.pipe(
      switchMap(
        time => this.db.list(`/vehicleSignouts/${vehicleID}/`, ref => ref.orderByChild('departing').endAt(time).limitToLast(1)).valueChanges()
      ),
      map(list => list[0])
    ) as Observable<VehicleSignout>;
  }

  getSignoutsByUser(user$: Observable<VehicleUser>): Observable<VehicleSignout[]> {
    return user$.pipe(
      switchMap(user => this.db.list(`/userSignouts/${user.uid}/`, ref => ref.orderByChild('startTime')).valueChanges())
    ) as Observable<VehicleSignout[]>;
  }


  saveSignout(signout: VehicleSignout): Promise<void> {
    const updates = {};
    updates[`vehicleSignouts/${signout.vehicleID}/${signout.uid}`] = signout;
    updates[`userSignouts/${signout.userID}/${signout.uid}`] = signout;
    return this.db.object('/').update(updates);
  }

  deleteSignout(signout: VehicleSignout): Promise<void> {
    const updates = {};
    updates[`vehicleSignouts/${signout.vehicleID}/${signout.uid}`] = null;
    updates[`userSignouts/${signout.userID}/${signout.uid}`] = null;
    return this.db.object('/').update(updates);
  }

  tempRemove(vehicle: string, key: string) {
    this.db.object(`/vehicles/${vehicle}/${key}`).remove();
  }
}
