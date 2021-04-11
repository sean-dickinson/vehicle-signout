import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RoutingModule } from "./routing.module";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./core/login/login.component";
import { SelectVehicleComponent } from "./core/components/select-vehicle/select-vehicle.component";
import { NavListComponent } from "./core/components/nav-list/nav-list.component";
import { SharedModule } from "./shared/shared.module";
import { AccountDropdownComponent } from "./core/components/account-dropdown/account-dropdown.component";
import { AvailableVehiclesCardComponent } from './core/components/available-vehicles-card/available-vehicles-card.component';
import { VehicleStatusTableComponent } from './core/components/available-vehicles-card/vehicle-status-table/vehicle-status-table.component';
import { VehicleStatusComponent } from './core/components/available-vehicles-card/vehicle-status-table/vehicle-status/vehicle-status.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectVehicleComponent,
    NavListComponent,
    AccountDropdownComponent,
    AvailableVehiclesCardComponent,
    VehicleStatusTableComponent,
    VehicleStatusComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
