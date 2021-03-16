import { Component, OnInit } from '@angular/core';
import { SignoutDataService } from '../../signout-data.service';
import { DialogService } from '../../dialog.service';
import { Observable, of } from 'rxjs';
import { VehicleSignout } from 'app/models/vehicle-signout';
import { UserService } from 'app/user.service';
import { VehicleUser } from 'app/models/vehicle-user';
import { signoutData } from 'testing-helpers/test-signout-data';

@Component({
  selector: 'manage-signouts-view',
  templateUrl: './manage-signouts-view.component.html',
  styleUrls: ['./manage-signouts-view.component.css']
})
export class ManageSignoutsViewComponent implements OnInit {
  signouts$: Observable<VehicleSignout[]>;
  user$: Observable<VehicleUser>;
  constructor(private sds:SignoutDataService, private us: UserService) {}

  ngOnInit() {
    this.user$ = this.us.getUser();
    this.signouts$ = this.sds.getSignoutsByUser(this.user$);
    // this.signouts$ = of(signoutData);
  }


}
