import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { VehicleSignout } from "./models/vehicle-signout";
import { VehicleUser } from "./models/vehicle-user";

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
          .collection("signouts", (ref) => ref.where("startTime", ">=", time))
          .valueChanges()
      )
    ) as Observable<VehicleSignout[]>;
  }

  getLastSignout(
    vehicleID: string,
    currentTime$: Observable<string>
  ): Observable<VehicleSignout> {
    return currentTime$.pipe(
      switchMap((time) =>{
        return this.af
          .doc(`vehicles/${vehicleID}`)
          .collection("signouts", (ref) =>
            ref.where("startTime", "<=", time).orderBy('startTime').limitToLast(1)
          )
          .valueChanges()
      }
      ),
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
            ref.where('userID', '==', user.uid)
          )
          .valueChanges()
      )
    ) as Observable<VehicleSignout[]>;
  }

  saveSignout(signout: VehicleSignout): Promise<void> {
    const vehicleID = signout.vehicleID;
    return this.af.doc(`vehicles/${vehicleID}`).collection('signouts').doc(signout.uid).set(signout);
  }

  createSignoutID(): string {
    return this.af.createId();
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
