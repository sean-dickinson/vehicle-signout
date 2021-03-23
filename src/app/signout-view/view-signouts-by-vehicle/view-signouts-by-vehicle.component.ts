import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Vehicle } from "app/models/vehicle";
import { VehicleSignout } from "app/models/vehicle-signout";
import { VehicleUser } from "app/models/vehicle-user";
import { SignoutDataService } from "app/signout-data.service";
import { TimeService } from "app/time.service";
import { UserService } from "app/user.service";
import { VehicleService } from "app/vehicle.service";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { map, switchMap, takeUntil, tap } from "rxjs/operators";
import { AddSignoutDialogComponent } from "../components/add-signout-dialog/add-signout-dialog.component";

@Component({
  selector: "view-signouts-by-vehicle",
  templateUrl: "./view-signouts-by-vehicle.component.html",
  styleUrls: ["./view-signouts-by-vehicle.component.css"],
})
export class ViewSignoutsByVehicleComponent implements OnInit, OnDestroy {
  vehicleID$: ReplaySubject<string>;
  vehicle$: Observable<Vehicle>;
  signouts$: Observable<VehicleSignout[]>;
  lastSignout$: Observable<VehicleSignout>;
  currentTime$: Observable<string>;
  currentVehicle: Vehicle;
  destroy$: Subject<boolean>;
  user: VehicleUser;
  constructor(
    private route: ActivatedRoute,
    private sds: SignoutDataService,
    private vs: VehicleService,
    private ts: TimeService,
    private us: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
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

      this.vehicle$.pipe(takeUntil(this.destroy$)).subscribe(vehicle => {
        this.currentVehicle = vehicle;
      });

      this.us.getUser().pipe(takeUntil(this.destroy$)).subscribe(user =>{
        this.user = user;
      });
  }

  ngOnDestroy(){
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  openDialog(){
    this.dialog.open(AddSignoutDialogComponent, {
      data: {
        vehicleName: this.currentVehicle.name,
        vehicleID: this.currentVehicle.uid,
        userID: this.user.uid,
        userName: this.user.displayName,
        uid: this.sds.createSignoutID()
      }
    }).afterClosed().subscribe((signout: VehicleSignout) => {
      if(signout){
        console.log(signout);
        this.sds.saveSignout(signout);
      }
    })
  }
}
