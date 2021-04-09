import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleMaterialModule } from './vehicle-material/vehicle-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignoutListComponent } from './signout-list/signout-list.component';
import { EditSignoutDialogComponent } from 'app/shared/components/edit-signout-dialog/edit-signout-dialog.component';
import { EditSignoutStepperComponent } from 'app/shared/components/edit-signout-dialog/edit-signout-stepper/edit-signout-stepper.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';


@NgModule({
  declarations: [
    SignoutListComponent,
    EditSignoutDialogComponent,
    EditSignoutStepperComponent,
    SimpleDialogComponent
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
    EditSignoutDialogComponent,
    EditSignoutStepperComponent,
    SimpleDialogComponent
  ]
})
export class SharedModule { }
