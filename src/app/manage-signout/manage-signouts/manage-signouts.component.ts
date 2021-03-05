import { Component, OnInit } from '@angular/core';
import { SignoutDataService } from '../../signout-data.service';
import { DialogService } from '../../dialog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'manage-signouts',
  templateUrl: './manage-signouts.component.html',
  styleUrls: ['./manage-signouts.component.css']
})
export class ManageSignoutsComponent implements OnInit {
  userSignouts: Observable<any[]>;
  constructor(public sds:SignoutDataService, public ds:DialogService) {
   
    // this.userSignouts = this.sds.getUserSignouts();
   }

  ngOnInit() {
  }

  // edit(signout:any){
  //   this.sds.tempRemove(signout.vehicle, signout.$key);
  //   let config = { 
  //     data: {
  //       departTime: new Date(signout.departing),
  //       returnTime: new Date(signout.returning),
  //       currentVehicle: signout.vehicle,
  //       purpose: signout.purpose,
  //       key: signout.$key
  //      }
  //   };
  //   this.ds.newSignout(config);
  // }

  // delete(signout:any){
  //   let config:any = {};
  //   config.data = {};
  //   config.data.key = signout.$key;
  //   config.data.vehicle = signout.vehicle;
  //   config.data.name = signout.name;
  //   this.ds.warnDialog(config);
  // }

}
