import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user: any;
  constructor(private us:UserService, private router:Router) {
    this.user = us.getUser();
   }

  ngOnInit() {
    if(this.user){
        this.router.navigateByUrl('');
      }
  }
}
