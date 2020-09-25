import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SignoutDataService } from "../signout-data.service";


@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
             private sds: SignoutDataService) { }

  ngOnInit() {
  }

  confirm(){
    this.sds.deleteSignout(this.data.key, this.data.vehicle, this.data.name);
  }

}
