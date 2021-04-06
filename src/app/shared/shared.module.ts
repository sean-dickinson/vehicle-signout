import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleMaterialModule } from './vehicle-material/vehicle-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignoutListComponent } from './signout-list/signout-list.component';
import { AddSignoutDialogComponent } from 'app/signout-view/components/add-signout-dialog/add-signout-dialog.component';
import { AddSignoutStepperComponent } from 'app/signout-view/components/add-signout-stepper/add-signout-stepper.component';


@NgModule({
  declarations: [
    SignoutListComponent,
    AddSignoutDialogComponent,
    AddSignoutStepperComponent
  ],
  imports: [
    CommonModule,
    VehicleMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    VehicleMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SignoutListComponent,
    AddSignoutDialogComponent,
    AddSignoutStepperComponent
  ]
})
export class SharedModule { }
