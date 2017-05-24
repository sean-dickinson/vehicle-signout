import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignoutListComponent } from './signout-list/signout-list.component';
import { SelectVehicleComponent } from './select-vehicle/select-vehicle.component';
import { ManageSignoutsComponent } from './manage-signouts/manage-signouts.component';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes:Routes = [
  {path: '', component: SelectVehicleComponent, canActivate: [AuthGuard]},
  {path: 'vehicle/:name', component: SignoutListComponent, canActivate: [AuthGuard]},
  {path:'mysignouts', component: ManageSignoutsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
