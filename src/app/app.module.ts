import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AddSignoutDialogComponent } from './signout-view/add-signout-dialog/add-signout-dialog.component';
import { LoginComponent } from './core/login/login.component';
import { SelectVehicleComponent } from './core/select-vehicle/select-vehicle.component';
import { ManageSignoutsComponent } from './manage-signout/manage-signouts/manage-signouts.component';
import { ConfirmDialogComponent } from './manage-signout/confirm-dialog/confirm-dialog.component';
import { NavListComponent } from './core/nav-list/nav-list.component';
import { UriEncodedPipe } from './uri-encoded.pipe';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
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
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedModule
  ],
  entryComponents: [AddSignoutDialogComponent, ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
