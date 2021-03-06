import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Vehicle } from "app/models/vehicle";
import { VehicleSignout } from "app/models/vehicle-signout";
import { SignoutDataService } from "app/signout-data.service";
import { TimeService } from "app/time.service";
import { VehicleService } from "app/vehicle.service";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

@Component({
  selector: "view-signouts-by-vehicle",
  templateUrl: "./view-signouts-by-vehicle.component.html",
  styleUrls: ["./view-signouts-by-vehicle.component.css"],
})
export class ViewSignoutsByVehicleComponent implements OnInit {
  vehicleID$: ReplaySubject<string>;
  vehicle$: Observable<Vehicle>;
  signouts$: Observable<VehicleSignout[]>;
  lastSignout$: Observable<VehicleSignout>;
  currentTime$: Observable<string>; 
  constructor(
    private route: ActivatedRoute,
    private sds: SignoutDataService,
    private vs: VehicleService,
    private ts: TimeService
  ) {}

  ngOnInit(): void {
    this.vehicleID$ = new ReplaySubject<string>(1);
    this.currentTime$ = this.ts.getCurrentTime();

    this.vehicle$ = this.vehicleID$.pipe(
      switchMap((id) => this.vs.getVehicleByID(id))
    );

    this.signouts$ = this.vehicleID$.pipe(
      switchMap((id) =>
        this.sds.getSignoutsByVehicle(id, this.currentTime$)
      )
    );

    this.lastSignout$ = this.vehicleID$.pipe(
      switchMap(id => this.sds.getLastSignout(id, this.currentTime$))
    );

    this.route.paramMap
      .pipe(map((params) => params.get("vehicleID")))
      .subscribe((id) => {
        this.vehicleID$.next(id);
      });
  }
}
