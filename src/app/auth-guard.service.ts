import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {}


  canActivate(route: ActivatedRouteSnapshot) {
        return this.afAuth.authState.pipe(
          map((user)=>{
            if(!user){
              this.router.navigateByUrl('login');
              return false;
              }
            return true;
        }),
        take(1)
      )
       
  }

}