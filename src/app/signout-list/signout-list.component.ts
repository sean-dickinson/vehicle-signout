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
  signouts: FirebaseListObservable<any[]>;
  name: string;
  currentTime: Date;
  timeSubscription;
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
    let source = Observable
          .interval(1000)
          .timeInterval();
    this.timeSubscription = source.subscribe((val)=>{
      this.currentTime = new Date();
    });
    this.route.paramMap.subscribe(
      (map) => {
        this.name = map.get('name').replace('-', ' ');
        this.allSignouts = this.sds.getSignouts(this.name);
        this.signouts = this.allSignouts.map(
        (list)=>{
          return list.filter(signOut=>{
              let departing = new Date(signOut.departing);
              return departing > this.currentTime;
            });
          }
          ) as FirebaseListObservable<any[]>;

        this.lastSignout = this.allSignouts.map((list)=>{
          let obj:any = null;
          for(let i=list.length -1; i>=0; i--){
            let departing = new Date(list[i].departing);
            let returning = new Date(list[i].returning);
            if(departing <= this.currentTime && returning >= this.currentTime){
              obj = list[i];
              break;
            }
            if(returning <= this.currentTime){
              obj = list[i];
              break;
            }
          }
          return obj;
        });
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
             }
     }
    this.ds.newSignout(config);
  }



}
