import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { VehicleUser } from './models/vehicle-user';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './models/vehicle';
import { Router } from '@angular/router';
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

  constructor(public us: UserService, public vs: VehicleService, public router: Router) {
    this.user$ = this.us.getUser();
    this.vehicles$ = this.vs.getActiveVehicles();
  }

  onLogout(){
    this.us.logoutUser().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
