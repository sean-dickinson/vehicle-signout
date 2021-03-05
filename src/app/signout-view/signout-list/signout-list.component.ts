import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignoutDataService } from '../../signout-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSignoutDialogComponent } from '../add-signout-dialog/add-signout-dialog.component';
import { DialogService } from '../../dialog.service';
import { Observable, BehaviorSubject, Subscription, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'signout-list',
  templateUrl: './signout-list.component.html',
  styleUrls: ['./signout-list.component.css']
})
export class SignoutListComponent {
  allSignouts: Observable<any[]>;
  lastSignout: Observable<any[]>;
  updatedLastSignout: Observable<any>;
  signouts: Observable<any[]>;
  name: string;
  currentTime: BehaviorSubject<string>;
  timeSubscription: Subscription;
  $timer: Observable<any>;
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private sds: SignoutDataService,
  public ds:DialogService,
  public dialog: MatDialog,
) {
   
}

  // ngOnInit() {
  //   this.route.paramMap.subscribe(
  //     (map) => {
  //       this.name = map.get('name').replace('-', ' ');
  //       let date = new Date();
  //       let dateString = date.toISOString();
  //       this.currentTime = new BehaviorSubject(dateString);
  //       this.signouts = this.sds.getSignouts(this.name, this.currentTime);
  //       this.lastSignout = this.sds.getLastSignout(this.name, this.currentTime);
  //       this.$timer = timer(1000*60);
  //       this.timeSubscription = this.$timer.subscribe((val)=>{
  //         date = new Date();
  //         dateString = date.toISOString();
  //         this.currentTime.next(dateString);
  //       });
  //     }
  //   );
  // }

  // ngOnDestroy(){
  //   this.timeSubscription.unsubscribe();
  // }

  // openDialog(){
  //   let now = new Date();
  //   let later = new Date();
  //   later.setHours(later.getHours() + 1);
  //    let config:any = {
  //      data: {
  //             departTime: now,
  //             returnTime: later,
  //             currentVehicle: this.name,
  //             purpose: ''
  //            },
  //      width: "400px"
  //    }
  //   this.ds.newSignout(config).subscribe((val)=>{
  //       let date = new Date();
  //       let dateString = date.toISOString();
  //       this.currentTime.next(dateString);
  //   })
  // }



}