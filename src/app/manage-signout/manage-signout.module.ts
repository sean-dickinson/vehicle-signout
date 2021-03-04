import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSignoutsComponent } from './manage-signouts/manage-signouts.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    ManageSignoutsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ManageSignoutModule { }
