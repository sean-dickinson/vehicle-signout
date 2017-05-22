import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FirebaseListObservable } from 'angularfire2/database';
import { SignoutDataService } from '../signout-data.service';
import { MdDialog } from '@angular/material';
import { AddSignoutDialogComponent } from '../add-signout-dialog/add-signout-dialog.component';
import { DialogService } from '../dialog.service';



@Component({
  selector: 'signout-list',
  templateUrl: './signout-list.component.html',
  styleUrls: ['./signout-list.component.css']
})
export class SignoutListComponent implements OnInit {
  signouts: FirebaseListObservable<any[]>;
  name: string;
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private sds: SignoutDataService,
  public ds:DialogService,
  public dialog: MdDialog,
) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      (map) => {
        this.name = map.get('name').replace('-', ' ');
        this.signouts = this.sds.getSignouts(this.name);
      }
    );
  }

  openDialog(){
     let config:any = {
       data: {
              currentVehicle: this.name
             }
     }
    this.ds.alert(config).subscribe(result => {
      this.saveSignout(result);
    })
  }

  saveSignout(data:any){
  }


}
