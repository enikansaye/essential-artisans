import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private api: ApiService,private router: Router, private loginApi: LoginService){}
  canActivate() {
    if(this.loginApi.isUserLoggedIn()){
      return true;
    }else{
      this.router.navigate(['signin']);
      return false
    }
   
  } 
  
}
