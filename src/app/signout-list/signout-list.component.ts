import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FirebaseListObservable } from 'angularfire2/database';
import { SignoutDataService } from '../signout-data.service';
import { MdDialog } from '@angular/material';
import { AddSignoutDialogComponent } from '../add-signout-dialog/add-signout-dialog.component';
import { DialogService } from '../dialog.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';



@Component({
  selector: 'signout-list',
  templateUrl: './signout-list.component.html',
  styleUrls: ['./signout-list.component.css']
})
export class SignoutListComponent implements OnInit {
  allSignouts: FirebaseListObservable<any[]>;
  lastSignout: Observable<any>;
  updatedLastSignout: Observable<any>;
  signouts: FirebaseListObservable<any[]>;
  name: string;
  currentTime: Date;
  timeSubscription;
  $timer: Observable<any>;
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private sds: SignoutDataService,
  public ds:DialogService,
  public dialog: MdDialog,
) {
   
}

  ngOnInit() {
    this.currentTime = new Date();
    this.route.paramMap.subscribe(
      (map) => {
        this.name = map.get('name').replace('-', ' ');
        this.signouts = this.sds.getSignouts(this.name);
        this.lastSignout = this.sds.getLastSignout(this.name);
       
      }
    );
  }

  openDialog(){
    let now = new Date();
    let later = new Date();
    later.setHours(later.getHours() + 1);
     let config:any = {
       data: {
              departTime: now,
              returnTime: later,
              currentVehicle: this.name,
              purpose: ''
             },
       width: "400px"
     }
    this.ds.newSignout(config).subscribe((val)=>{
      this.signouts = this.sds.getSignouts(this.name);
      this.lastSignout = this.sds.getLastSignout(this.name);
    })
  }



}
