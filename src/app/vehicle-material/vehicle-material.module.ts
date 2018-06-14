import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule, 
        MatListModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  exports: [
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  declarations: []
})
export class VehicleMaterialModule { }
