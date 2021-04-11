import { Component, OnInit } from '@angular/core';
import { SignoutDataService } from 'app/core/services/signout-data.service';
import { TimeService } from 'app/core/services/time.service';
import { VehicleService } from 'app/core/services/vehicle.service';
import { Vehicle } from 'app/models/vehicle';
import { VehicleSignout } from 'app/models/vehicle-signout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-available-vehicles-card',
  templateUrl: './available-vehicles-card.component.html',
  styleUrls: ['./available-vehicles-card.component.css']
})
export class AvailableVehiclesCardComponent implements OnInit {
  vehicles$: Observable<Vehicle[]>;
  currentSignouts$: Observable<VehicleSignout[]>;
  constructor(private vs: VehicleService, private sds: SignoutDataService, private ts: TimeService) { }

  ngOnInit(): void {
    this.vehicles$ = this.vs.getActiveVehicles();
    this.currentSignouts$ = this.sds.getCurrentSignouts(this.ts.getCurrentTime());
  }

}
