import { Component, OnInit } from '@angular/core';
import { SignoutDataService } from '../signout-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user: any;
  constructor(private sds:SignoutDataService, private router:Router) {
    this.user = sds.getAuth();
   }

  ngOnInit() {
    if(this.user){
        this.router.navigateByUrl('vehicle/Civic');
      }
  }

  login(){
    this.sds.login().then((success)=>{
      this.router.navigateByUrl('vehicle/Civic');
    })
  }
}
