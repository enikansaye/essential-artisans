import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private api : ApiService, private router: Router){}
  canActivate(){
    if(this.api.haveaccess(this.api.getUserToken())){
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
