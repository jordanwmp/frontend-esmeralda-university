import { Injectable } from '@angular/core';
import { 
   ActivatedRouteSnapshot,
   CanActivate, 
   RouterStateSnapshot, 
   UrlTree,
   Router
   } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isLoggedIn !== true)
      {
        console.log('Access not allowed')
        this.router.navigate(['/admin-login'])
      }
      return true;
  }
  
}
