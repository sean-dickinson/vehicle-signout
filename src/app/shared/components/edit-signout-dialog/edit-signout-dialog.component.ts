import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { VehicleService } from 'app/vehicle.service';
import { Vehicle } from 'app/models/vehicle';
import { VehicleSignout } from 'app/models/vehicle-signout';

@Component({
  selector: 'edit-signout-dialog',
  templateUrl: './edit-signout-dialog.component.html',
  styleUrls: ['./edit-signout-dialog.component.css'],
})
export class EditSignoutDialogComponent {
  vehicles$: Observable<Vehicle[]>;
  currentVehicle: Vehicle;
  validSignout: boolean;
  signout: VehicleSignout;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private vs: VehicleService,
    public dialogRef: MatDialogRef<EditSignoutDialogComponent>
  ) {
    this.vehicles$ = this.vs.getActiveVehicles();
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    this.signout = {
      startTime,
      endTime,
      ...data,
    };
  }

  saveSignout(signout: VehicleSignout) {
    this.dialogRef.close(signout);
  }
}
