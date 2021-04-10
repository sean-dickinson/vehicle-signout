import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { UserService } from "./core/services/user.service";
import { VehicleUser } from "./models/vehicle-user";
import { VehicleService } from "./core/services/vehicle.service";
import { Vehicle } from "./models/vehicle";
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { filter, takeUntil } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  mode = "side";
  opened = true;
  user$: Observable<VehicleUser>;
  vehicles$: Observable<Vehicle[]>;
  layoutChanges$: Observable<BreakpointState>;
  navigationEnd$: Observable<NavigationStart>;
  destroyed$: Subject<Boolean>;

  constructor(
    public us: UserService,
    public vs: VehicleService,
    public router: Router,
    public bp$: BreakpointObserver
  ) {
    this.user$ = this.us.getUser();
    this.vehicles$ = this.vs.getActiveVehicles();
    this.layoutChanges$ = this.bp$.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait,
    ]);
    this.destroyed$ = new Subject<Boolean>();
    this.navigationEnd$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit(): void {
    this.layoutChanges$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.mode = "over";
          this.opened = false;
        } else {
          this.mode = "side";
          this.opened = true;
        }
      });

    this.navigationEnd$
      .pipe(
        takeUntil(this.destroyed$)
        )
      .subscribe(() => {
        if (this.mode === "over") {
          this.opened = false;
        }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  onLogout() {
    this.us.logoutUser().then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
