import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable, of } from "rxjs";
import { Vehicle } from "./models/vehicle";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  constructor(private rtdb: AngularFireDatabase) {}

  getActiveVehicles(): Observable<Vehicle[]> {
    return this.rtdb
      .list("/vehicles", (ref) => ref.orderByChild("isActive").equalTo(true))
      .valueChanges() as Observable<Vehicle[]>;
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.rtdb
      .list('vehicles')
      .valueChanges() as Observable<Vehicle[]>;
  }
}
