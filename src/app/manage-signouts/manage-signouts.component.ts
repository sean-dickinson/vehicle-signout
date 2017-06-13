import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { SignoutDataService } from '../signout-data.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'manage-signouts',
  templateUrl: './manage-signouts.component.html',
  styleUrls: ['./manage-signouts.component.css']
})
export class ManageSignoutsComponent implements OnInit {
  userSignouts: FirebaseListObservable<any[]>;
  constructor(public sds:SignoutDataService, public ds:DialogService) {
   
    this.userSignouts = this.sds.getUserSignouts();
   }

  ngOnInit() {
  }

  edit(signout:any){
    this.sds.tempRemove(signout.vehicle, signout.$key);
    let config = { 
      data: {
        departTime: new Date(signout.departing),
        returnTime: new Date(signout.returning),
        currentVehicle: signout.vehicle,
        purpose: signout.purpose,
        key: signout.$key
       }
    };
    this.ds.newSignout(config);
  }

  delete(signout:any){
    let key = signout.$key;
    let vehicle = signout.vehicle;
    let name = signout.name;
    this.sds.deleteSignout(key, vehicle, name);
  }

}
