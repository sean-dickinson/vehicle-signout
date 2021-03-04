import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignoutListComponent } from './signout-view/signout-list/signout-list.component';
import { SelectVehicleComponent } from './core/select-vehicle/select-vehicle.component';
import { LoginComponent } from './core/login/login.component';

const routes:Routes = [
  {path: '', component: SelectVehicleComponent},
  {path: 'vehicle/:name', component: SignoutListComponent},
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
