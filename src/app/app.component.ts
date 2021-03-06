import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { UserService } from "./user.service";
import { VehicleUser } from "./models/vehicle-user";
import { VehicleService } from "./vehicle.service";
import { Vehicle } from "./models/vehicle";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  mode: string = "side";
  opened: boolean = true;
  user$: Observable<VehicleUser>;
  vehicles$: Observable<Vehicle[]>;

  constructor(public us: UserService, public auth: AngularFireAuth, public vs: VehicleService) {
    this.user$ = this.us.getUser();
    this.vehicles$ = this.vs.getActiveVehicles();
  }

  login() {
    this.auth
      .signInWithPopup(new firebase.auth.EmailAuthProvider())
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        this.us.setUser(uid);
      });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.us.logoutUser();
    });
  }
}
