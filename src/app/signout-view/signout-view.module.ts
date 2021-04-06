import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewSignoutsByVehicleComponent } from './view-signouts-by-vehicle/view-signouts-by-vehicle.component';
import { VehicleSignoutCardComponent } from './components/vehicle-signout-card/vehicle-signout-card.component';
import { SignoutViewRoutingModule } from './signout-view-routing.module';
import { LastSignoutComponent } from './components/last-signout/last-signout.component';




@NgModule({
  declarations: [
    ViewSignoutsByVehicleComponent,
    VehicleSignoutCardComponent,
    LastSignoutComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    SignoutViewRoutingModule
  ]
})
export class SignoutViewModule { }
