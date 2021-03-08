import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelectVehicleComponent } from './core/select-vehicle/select-vehicle.component';
import { LoginComponent } from './core/login/login.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes:Routes = [
  {path: '', component: SelectVehicleComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'vehicle', loadChildren: () => import('./signout-view/signout-view.module').then(m => m.SignoutViewModule)},
  {path:'my-signouts', loadChildren: () => import('./manage-signout/manage-signout.module').then(m => m.ManageSignoutModule)},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class RoutingModule { }
