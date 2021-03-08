import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { UserService } from '../../user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private us:UserService, private auth: AngularFireAuth) {
   
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
