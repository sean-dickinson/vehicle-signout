import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { VehicleUser } from './models/vehicle-user';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './models/vehicle';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  mode = 'side';
  opened = true;
  user$: Observable<VehicleUser>;
  vehicles$: Observable<Vehicle[]>;

  constructor(public us: UserService, public vs: VehicleService) {
    this.user$ = this.us.getUser();
    this.vehicles$ = this.vs.getActiveVehicles();
  }

}
