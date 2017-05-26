import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
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
  user: any;
  constructor(public sds:SignoutDataService,
  private router: Router,
  private route: ActivatedRoute,
  private windowRef:WindowRefService){
    this.user = sds.getAuth();
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

  getIcon(key:string):number{
    if(key.indexOf('Bus') == 0){
      return 0
    }
    if(key.indexOf('Van') > 0){
      return 1;
    }
    return 2;
  }

  login(){
    this.sds.login().then((success)=>{
      this.router.navigateByUrl('');
    });
  }

  logout(){
    this.sds.logout().then((success)=>{
      this.router.navigateByUrl('login');
    });
  }
   

}
