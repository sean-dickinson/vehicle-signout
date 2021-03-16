import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSignoutsViewComponent } from './manage-signouts-view/manage-signouts-view.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { ManageSignoutsRoutingModule } from './manage-signout-routing.module';
import { ManageSignoutsCardComponent } from './manage-signouts-card/manage-signouts-card.component';


@NgModule({
  declarations: [
    ManageSignoutsViewComponent,
    ConfirmDialogComponent,
    ManageSignoutsCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManageSignoutsRoutingModule
  ]
})
export class ManageSignoutModule { }
