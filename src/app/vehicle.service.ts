import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Vehicle } from './models/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private af: AngularFirestore) {}

  getActiveVehicles(): Observable<Vehicle[]> {
    return this.af
      .collection('vehicles', (ref) => ref.where('isActive', '==', true))
      .valueChanges() as Observable<Vehicle[]>;
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.af
      .collection('vehicles')
      .valueChanges() as Observable<Vehicle[]>;
  }

  getVehicleByID(id: string): Observable<Vehicle> {
    return this.af.doc(`vehicles/${id}`).valueChanges() as Observable<Vehicle>;
  }
}
