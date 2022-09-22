import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private api : ApiService, private router: Router,private loginApi: LoginService){}
  canActivate(){
    if(this.loginApi.haveaccess(this.loginApi.getToken())){
      return true
    };
    this.router.navigate(["forbidden"])
   return false
// if(this.api.loggedIn()){
//   return true;
// }else{
//   this.router.navigate(["/"])
//   return true;
// }
   
  }
  
}
