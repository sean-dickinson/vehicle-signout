import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SignoutListComponent } from './signout-list/signout-list.component';
import { ViewSignoutsByVehicleComponent } from './view-signouts-by-vehicle/view-signouts-by-vehicle.component';
import { VehicleSignoutCardComponent } from './vehicle-signout-card/vehicle-signout-card.component';
import { SignoutViewRoutingModule } from './signout-view-routing.module';
import { LastSignoutComponent } from './last-signout/last-signout.component';



@NgModule({
  declarations: [
    SignoutListComponent,
    ViewSignoutsByVehicleComponent,
    VehicleSignoutCardComponent,
    LastSignoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SignoutViewRoutingModule
  ]
})
export class SignoutViewModule { }
