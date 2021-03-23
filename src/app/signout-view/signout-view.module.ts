import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewSignoutsByVehicleComponent } from './view-signouts-by-vehicle/view-signouts-by-vehicle.component';
import { VehicleSignoutCardComponent } from './components/vehicle-signout-card/vehicle-signout-card.component';
import { SignoutViewRoutingModule } from './signout-view-routing.module';
import { LastSignoutComponent } from './components/last-signout/last-signout.component';
import { AddSignoutDialogComponent } from './components/add-signout-dialog/add-signout-dialog.component';
import { AddSignoutStepperComponent } from './components/add-signout-stepper/add-signout-stepper.component';



@NgModule({
  declarations: [
    ViewSignoutsByVehicleComponent,
    VehicleSignoutCardComponent,
    LastSignoutComponent,
    AddSignoutDialogComponent,
    AddSignoutStepperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SignoutViewRoutingModule
  ]
})
export class SignoutViewModule { }
