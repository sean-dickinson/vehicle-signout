import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { VehicleMaterialModule } from './vehicle-material/vehicle-material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { SignoutListComponent } from './signout/signout-list/signout-list.component';
import { AddSignoutDialogComponent } from './signout/add-signout-dialog/add-signout-dialog.component';
import { LoginComponent } from './core/login/login.component';
import { SelectVehicleComponent } from './select-vehicle/select-vehicle.component';
import { ManageSignoutsComponent } from './manage-signout/manage-signouts/manage-signouts.component';
import { ConfirmDialogComponent } from './manage-signout/confirm-dialog/confirm-dialog.component';
import { NavListComponent } from './core/nav-list/nav-list.component';
import { UriEncodedPipe } from './uri-encoded.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignoutListComponent,
    AddSignoutDialogComponent,
    LoginComponent,
    SelectVehicleComponent,
    ManageSignoutsComponent,
    ConfirmDialogComponent,
    NavListComponent,
    UriEncodedPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    VehicleMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  entryComponents: [AddSignoutDialogComponent, ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
