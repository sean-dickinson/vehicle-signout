import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignoutListComponent } from './signout-list/signout-list.component';
import { SelectVehicleComponent } from './select-vehicle/select-vehicle.component';
import { ManageSignoutsComponent } from './manage-signouts/manage-signouts.component';
import { LoginComponent } from './login/login.component';

const routes:Routes = [
  {path: '', component: SelectVehicleComponent},
  {path: 'vehicle/:name', component: SignoutListComponent},
  {path:'mysignouts', component: ManageSignoutsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
