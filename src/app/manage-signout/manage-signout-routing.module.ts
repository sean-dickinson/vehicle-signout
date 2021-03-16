import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageSignoutsViewComponent } from "./manage-signouts-view/manage-signouts-view.component";

const routes: Routes = [
    {path: '', component: ManageSignoutsViewComponent}    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageSignoutsRoutingModule {}