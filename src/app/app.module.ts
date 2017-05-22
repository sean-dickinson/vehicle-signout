import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';
import { VehicleMaterialModule } from './vehicle-material/vehicle-material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { Md2Module } from 'md2';
import { AppComponent } from './app.component';
import { SignoutListComponent } from './signout-list/signout-list.component';
import { AddSignoutDialogComponent } from './add-signout-dialog/add-signout-dialog.component';
import { DialogService } from './dialog.service';
import { VehicleInUseDirective } from './vehicle-in-use.directive';
import { SignoutDataService } from './signout-data.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { WindowRefService } from './window-ref.service';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    SignoutListComponent,
    AddSignoutDialogComponent,
    VehicleInUseDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    VehicleMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Md2Module.forRoot()
  ],
  providers: [DialogService, SignoutDataService, AuthGuard, WindowRefService],
  entryComponents: [AddSignoutDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
