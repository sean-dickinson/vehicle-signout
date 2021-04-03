import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSignoutsByVehicleComponent } from './view-signouts-by-vehicle/view-signouts-by-vehicle.component';

const routes: Routes = [
    {path: ':vehicleID', component: ViewSignoutsByVehicleComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignoutViewRoutingModule {}
