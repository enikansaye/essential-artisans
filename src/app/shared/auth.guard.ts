import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiService } from '../service/api.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private api: ApiService,private router: Router, private loginApi: LoginService,private http: HttpClient){}
  canActivate() {
    if(this.loginApi.isUserLoggedIn()){
      return true;
    }else{
      this.router.navigate(['signin']);
      return false
    }
   
  } 
  // async canActivate() {
  //   const token = localStorage.getItem('accesstoken')
  //   if (token && !this.jwtHelper.isTokenExpired(token)) {
  //     return true;
  //   }
  //   const isRefreshSuccess = await this.refreshingTokens(token);
  //   if (!isRefreshSuccess) {
  //     this.router.navigate(["signin"]);
  //   }

  //   return isRefreshSuccess;
  //   // return
  // }
  // private async refreshingTokens(token: string | null): Promise<boolean> {
  //   const refreshToken: string | null = localStorage.getItem("refreshtoken");

  //   if (!token || !refreshToken) {
  //     return false;
  //   }
  //   const tokenModel = JSON.stringify({ accesstoken: token, refreshtoken: refreshToken });

  //   let isRefreshSuccess: boolean;
  //   try {

  //     const response = await lastValueFrom(this.http.post(this.api.baseUrl + "/api/Auth/refresh-token", tokenModel));
  //     const newToken = (<any>response).accesstoken;
  //     // console.log(newToken);
      
  //     const newRefreshToken = (<any>response).refreshtoken;
  //     // console.log(newRefreshToken);
      
  //     localStorage.setItem("accesstoken", newToken);
  //     localStorage.setItem("refreshtoken", newRefreshToken);
  //     // console.log("Token renewed successfully");
      
  //     // this.notification.showSuccess("Token renewed successfully", "Success")
  //     isRefreshSuccess = true;
  //   }
  //   catch (ex) {
  //     isRefreshSuccess = false;
  //   }
  //   return isRefreshSuccess;
  
  // }
}
