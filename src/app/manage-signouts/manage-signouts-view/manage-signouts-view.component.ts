import { Component, OnInit } from "@angular/core";
import { SignoutDataService } from "app/core/services/signout-data.service";
import { Observable } from "rxjs";
import { VehicleSignout } from "app/models/vehicle-signout";
import { UserService } from "app/core/services/user.service";
import { VehicleUser } from "app/models/vehicle-user";
import { TimeService } from "app/core/services/time.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { EditSignoutDialogComponent } from "app/shared/components/edit-signout-dialog/edit-signout-dialog.component";

@Component({
  selector: "app-manage-signouts-view",
  templateUrl: "./manage-signouts-view.component.html",
  styleUrls: ["./manage-signouts-view.component.css"],
})
export class ManageSignoutsViewComponent implements OnInit {
  pastSignouts$: Observable<VehicleSignout[]>;
  currentSignouts$: Observable<VehicleSignout[]>;
  user$: Observable<VehicleUser>;
  time$: Observable<string>;
  constructor(
    private sds: SignoutDataService,
    private us: UserService,
    private ts: TimeService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user$ = this.us.getUser();
    this.time$ = this.ts.getCurrentTime();
    this.pastSignouts$ = this.sds.getSignoutsByUser(this.user$, this.time$);
    this.currentSignouts$ = this.sds.getSignoutsByUser(this.user$, this.time$, false);
  }

  editSignout(signout: VehicleSignout) {
    this.dialog.open(EditSignoutDialogComponent, {
      data: {
        ...signout
      }
    }).afterClosed().subscribe(editedSignout => {
      if(editedSignout){
        this.sds.saveSignout(editedSignout)
      }
    })
  }

  removeSignout(signout: VehicleSignout) {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(shouldDelete => {
      if(shouldDelete){
        this.sds.removeSignout(signout);
      }
    })
  }
}
