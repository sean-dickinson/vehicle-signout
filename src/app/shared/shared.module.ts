import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleMaterialModule } from './vehicle-material/vehicle-material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    VehicleMaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [
    VehicleMaterialModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
