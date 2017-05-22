import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdSidenavModule, 
        MdListModule,
        MdCardModule,
        MdToolbarModule,
        MdButtonModule,
        MdDialogModule,
        MdIconModule,
        MdTabsModule,
        MdSelectModule,
        MdInputModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdSidenavModule,
    MdListModule,
    MdCardModule,
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdTabsModule,
    MdSelectModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTooltipModule
  ],
  exports: [
    MdSidenavModule,
    MdListModule,
    MdCardModule,
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdTabsModule,
    MdSelectModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTooltipModule
  ],
  declarations: []
})
export class VehicleMaterialModule { }
