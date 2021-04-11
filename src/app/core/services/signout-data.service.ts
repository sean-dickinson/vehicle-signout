import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { combineLatest, Observable, of } from "rxjs";
import { filter, map, switchMap, take, tap } from "rxjs/operators";
import { VehicleSignout } from "../../models/vehicle-signout";
import { VehicleUser } from "../../models/vehicle-user";
import { combineDateTime } from "../../utilities/helper-functions";

@Injectable({
  providedIn: "root",
})
export class SignoutDataService {
  constructor(private af: AngularFirestore) {}

  getSignoutsByVehicle(
    vehicleID: string,
    currentTime$: Observable<string>
  ): Observable<VehicleSignout[]> {
    const startTime$ = currentTime$.pipe(take(1));
    const signouts$ = startTime$.pipe(
      switchMap(time => this.af
        .doc(`vehicles/${vehicleID}`)
        .collection("signouts", (ref) => ref.where("endTime", ">=", time))
        .valueChanges() as Observable<VehicleSignout[]>
      )
    );
    return combineLatest([signouts$, currentTime$]).pipe(
      map(([signouts, currentTime]) => signouts.filter(s => s.endTime >= currentTime))
    );
  }

  getCurrentSignouts(
    currentTime$: Observable<string>
  ): Observable<VehicleSignout[]> {
    const startTime$ = currentTime$.pipe(take(1));
    const signouts$ = startTime$.pipe(
      switchMap(time => this.af
        .collectionGroup("signouts", (ref) => ref.where("endTime", ">=", time))
        .valueChanges() as Observable<VehicleSignout[]>
      )
    );
    return combineLatest([signouts$, currentTime$]).pipe(
      map(([signouts, currentTime]) => signouts.filter(s => s.endTime >= currentTime && s.startTime <= currentTime))
    );
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
            ref.where("endTime", "<=", time).orderBy("endTime").limitToLast(1)
          )
          .valueChanges();
      }),
      map((list) => list[0])
    ) as Observable<VehicleSignout>;
  }

  getSignoutsByUser(
    user$: Observable<VehicleUser>,
    time$: Observable<string>,
    isPast = true
  ): Observable<VehicleSignout[]> {
    const timeComparison = isPast ? "<" : ">=";
    return combineLatest([user$, time$]).pipe(
      switchMap(([user, time]) =>
        this.af
          .collectionGroup(`signouts`, (ref) =>
            ref
              .where("userID", "==", user.uid)
              .where("endTime", timeComparison, time)
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
        ctrl.get("startParentGroup.startTimeCtrl").value
      ).toISOString();
      const endTime = combineDateTime(
        ctrl.get("endParentGroup.endDateCtrl").value,
        ctrl.get("endParentGroup.endTimeCtrl").value
      ).toISOString();
      const currentSignout = { ...signout, startTime, endTime };
      const startTime$ = of(currentSignout.startTime);
      return this.getSignoutsByVehicle(
        currentSignout.vehicleID,
        startTime$
      ).pipe(
        take(1),
        map((signouts) =>
          signouts.filter((s) => {
            if (s.uid === currentSignout.uid) {
              return false;
            } else {
              const startConflict =
                currentSignout.startTime <= s.endTime &&
                currentSignout.startTime >= s.startTime;
              const endConflict =
                currentSignout.endTime <= s.endTime &&
                currentSignout.endTime >= s.startTime;
              return startConflict || endConflict;
            }
          })
        ),
        map((conflicts) =>
          conflicts.length > 0 ? { signoutConflict: true } : null
        )
      );
    };
  }

  removeSignout(signout: VehicleSignout): Promise<void> {
    return this.af
      .doc(`vehicles/${signout.vehicleID}`)
      .collection("signouts")
      .doc(signout.uid)
      .delete();
  }
}
