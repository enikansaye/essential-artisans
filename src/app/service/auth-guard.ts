import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private api: ApiService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
  let userInfo = this.api.loggedIn();
  if(route.data['userType'] === 'guest'){
      return true;
  }else if(route.data['userType'] === 'CUSTOMER'){
      if(userInfo.id > 0){
          return true
      }
      this.router.navigate(['/dashboard'])
  }else if(route.data['userType'] === 'ARTISAN'){
    if(userInfo.id > 0){
        return true
    }
    this.router.navigate(['/dashboard'])
}
  else if(route.data['userType'] === 'ARTISAN'){
    if(userInfo.id === 0){
        return true
    }
    this.router.navigate(['/siginin'])
    return false;
}else if(route.data['userType'] === 'CUSTOMER'){
  if(userInfo.id === 0){
      return true
  }
  this.router.navigate(['/siginin'])
  return false;
}
 this.router.navigate(['/pagenotfound'])
 return false;
  }
}
