import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AddSignoutDialogComponent } from './add-signout-dialog/add-signout-dialog.component';
import { DialogService } from './dialog.service';
import { SignoutDataService } from './signout-data.service';
import { WindowRefService } from './window-ref.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  vehicleNames: FirebaseListObservable<any[]>;
  private _window: Window;
  mode: string;
  opened: boolean;
  constructor(public sds:SignoutDataService,
  public ds:DialogService,
  public dialog: MdDialog,
  private router: Router,
  private route: ActivatedRoute,
  private windowRef:WindowRefService){
    this.vehicleNames = sds.getVehicleNames();
    this._window = windowRef.nativeWindow;
    
    let width = this._window.innerWidth;
    if(width < 768){
      this.mode = 'over';
      this.opened = false;
    }
    else{
      this.mode = 'side';
      this.opened = true;
    }

  }

  getEncoded(path:string):string{
    return path.replace(' ', '-');
  }

  getDecoded(path:string):string{
    return path.replace('-', ' ');
  }

   openDialog(){
     let url = this.router.url;
     let vehicle = url.substring(url.lastIndexOf('/') + 1);
     console.log(vehicle);
     vehicle = this.getDecoded(vehicle);
     let config:any = {
       data: {vehicleNames: this.vehicleNames,
              currentVehicle: vehicle
             }
     }
    this.ds.alert(config).subscribe(result => {
      this.saveSignout(result);
    })
  }

  saveSignout(data:any){
  }

}
