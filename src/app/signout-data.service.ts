import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { VehicleSignout } from "./models/vehicle-signout";
import { VehicleUser } from "./models/vehicle-user";
import { combineDateTime } from "./utilities/functions";

@Injectable({
  providedIn: "root",
})
export class SignoutDataService {
  constructor(private af: AngularFirestore) {}

  getSignoutsByVehicle(
    vehicleID: string,
    currentTime$: Observable<string>
  ): Observable<VehicleSignout[]> {
    return currentTime$.pipe(
      switchMap((time) =>
        this.af
          .doc(`vehicles/${vehicleID}`)
          .collection("signouts", (ref) => ref.where("endTime", ">=", time))
          .valueChanges()
      )
    ) as Observable<VehicleSignout[]>;
  }

  getLastSignout(
    vehicleID: string,
    currentTime$: Observable<string>
  ): Observable<VehicleSignout> {
    return currentTime$.pipe(
      switchMap((time) => {
        return this.af
          .doc(`vehicles/${vehicleID}`)
          .collection("signouts", (ref) =>
            ref
              .where("endTime", "<=", time)
              .orderBy("endTime")
              .limitToLast(1)
          )
          .valueChanges();
      }),
      map((list) => list[0])
    ) as Observable<VehicleSignout>;
  }
  // TODO: Consider filtering/paginating by time
  getSignoutsByUser(
    user$: Observable<VehicleUser>
  ): Observable<VehicleSignout[]> {
    return user$.pipe(
      switchMap((user) =>
        this.af
          .collectionGroup(`signouts`, (ref) =>
            ref.where("userID", "==", user.uid)
          )
          .valueChanges()
      )
    ) as Observable<VehicleSignout[]>;
  }

  saveSignout(signout: VehicleSignout): Promise<void> {
    const vehicleID = signout.vehicleID;
    return this.af
      .doc(`vehicles/${vehicleID}`)
      .collection("signouts")
      .doc(signout.uid)
      .set(signout);
  }

  createSignoutID(): string {
    return this.af.createId();
  }

  signoutConflict(signout: VehicleSignout): AsyncValidatorFn {
    return (ctrl: AbstractControl) => {
      const startTime = combineDateTime(
        ctrl.get("startParentGroup.startDateCtrl").value,
        ctrl.get("startParentGroup.startTimeCtrl").value).toISOString();
      const endTime = combineDateTime(
        ctrl.get("endParentGroup.endDateCtrl").value,
        ctrl.get("endParentGroup.endTimeCtrl").value).toISOString();
      const currentSignout = {...signout, startTime, endTime}
      const startTime$ = of(currentSignout.startTime);
      return this.getSignoutsByVehicle(currentSignout.vehicleID, startTime$).pipe(
        take(1),
        map((signouts) =>
          signouts.filter((s) => {
            if (s.uid === currentSignout.uid) {
              return false;
            } else {
              const startConflict = currentSignout.startTime <= s.endTime && currentSignout.startTime >= s.startTime;
              const endConflict = currentSignout.endTime <= s.endTime && currentSignout.endTime >= s.startTime;
              return startConflict || endConflict;
            }
          })
        ),
        map((conflicts) => conflicts.length > 0 ? {signoutConflict: true} : null )
      );
    };
  }

  // saveSignout(signout: VehicleSignout): Promise<void> {
  //   const updates = {};
  //   updates[`vehicleSignouts/${signout.vehicleID}/${signout.uid}`] = signout;
  //   updates[`userSignouts/${signout.userID}/${signout.uid}`] = signout;
  //   return this.db.object("/").update(updates);
  // }

  // deleteSignout(signout: VehicleSignout): Promise<void> {
  //   const updates = {};
  //   updates[`vehicleSignouts/${signout.vehicleID}/${signout.uid}`] = null;
  //   updates[`userSignouts/${signout.userID}/${signout.uid}`] = null;
  //   return this.db.object("/").update(updates);
  // }
}
