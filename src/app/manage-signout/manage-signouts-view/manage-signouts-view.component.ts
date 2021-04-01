import { Component, OnInit } from '@angular/core';
import { SignoutDataService } from '../../signout-data.service';
import { Observable, } from 'rxjs';
import { VehicleSignout } from 'app/models/vehicle-signout';
import { UserService } from 'app/user.service';
import { VehicleUser } from 'app/models/vehicle-user';
import { TimeService } from 'app/time.service';

@Component({
  selector: 'manage-signouts-view',
  templateUrl: './manage-signouts-view.component.html',
  styleUrls: ['./manage-signouts-view.component.css']
})
export class ManageSignoutsViewComponent implements OnInit {
  signouts$: Observable<VehicleSignout[]>;
  user$: Observable<VehicleUser>;
  time$: Observable<string>;
  constructor(private sds:SignoutDataService, private us: UserService, private ts: TimeService) {}

  ngOnInit() {
    this.user$ = this.us.getUser();
    this.signouts$ = this.sds.getSignoutsByUser(this.user$);
    this.time$ = this.ts.getCurrentTime();
    // this.signouts$ = of(signoutData);
  }


}
