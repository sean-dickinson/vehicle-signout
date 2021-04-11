import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { sortByProp } from 'app/utilities/helper-functions';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle } from '../../models/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private af: AngularFirestore) {}

  getActiveVehicles(): Observable<Vehicle[]> {
    return this.af
      .collection('vehicles', (ref) => ref.where('isActive', '==', true))
      .valueChanges().pipe(
        map((list: Vehicle[]) => list.sort(sortByProp('name')))
      ) 
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.af
      .collection('vehicles', ref => ref.orderBy('name'))
      .valueChanges() as Observable<Vehicle[]>;
  }

  getVehicleByID(id: string): Observable<Vehicle> {
    return this.af.doc(`vehicles/${id}`).valueChanges() as Observable<Vehicle>;
  }
}
