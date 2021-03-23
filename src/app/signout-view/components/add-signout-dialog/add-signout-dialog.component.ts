import { Component, Inject } from "@angular/core";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Observable } from "rxjs";
import { VehicleService } from "app/vehicle.service";
import { Vehicle } from "app/models/vehicle";
import { VehicleSignout } from "app/models/vehicle-signout";

@Component({
  selector: "add-signout-dialog",
  templateUrl: "./add-signout-dialog.component.html",
  styleUrls: ["./add-signout-dialog.component.css"],
})
export class AddSignoutDialogComponent {
  vehicles$: Observable<Vehicle[]>;
  currentVehicle: Vehicle;
  validSignout: boolean;
  signout: VehicleSignout;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private vs: VehicleService,
    public dialogRef: MatDialogRef<AddSignoutDialogComponent>
  ) {
    this.vehicles$ = this.vs.getActiveVehicles();
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    this.signout = {
      ...data,
      startTime,
      endTime,
    };
  }

  saveSignout(signout: VehicleSignout) {
    this.dialogRef.close(signout);
  }
}
