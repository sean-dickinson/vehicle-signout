import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { UserService } from './user.service';
import { VehicleUser } from './models/vehicle-user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  vehicleNames: Observable<any[]>;
  mode: string;
  opened: boolean;
  user$: Observable<VehicleUser>;

  constructor(public us:UserService, public auth: AngularFireAuth){
    this.user$ = this.us.getUser();
  }

  login(){
    this.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then(userCredential => {
      const uid = userCredential.user.uid;
      this.us.setUser(uid);
    });
  }

  logout(){
    this.auth.signOut().then(() => {
      this.us.logoutUser();
    })
  }
   

}
