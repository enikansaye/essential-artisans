import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedinUser: any;

  constructor(private http:HttpClient, private router: Router,private api: ApiService) { }
  tokenresp:any;

  private _updatemenu =new Subject<void>();
  get updatemrnu(){
    return this._updatemenu;
  }

    // login user
    loginUser(user: any) {
      return this.http.post(
        this.api.baseUrl + '/api/Auth/login',
        user
      );
    }
logoutUser(){
  return this.http.delete(
    this.api.baseUrl + '/api/Auth/logout',
    
  ); 
}
    GenerateRefreshToken(payload:any) {
      let input = {
        // "accessToken": this.getToken(),
        "refreshToken": this.getRefreshToken()
        // refreshToken: this.getRefresToken(),
        // refreshToken: localStorage.getItem('refreshToken') || '',
      };
    //  let input =localStorage.getItem('refreshToken');
     console.log(input);
     let value =input.refreshToken

     

      return this.http.post(this.api.baseUrl + '/api/Auth/refresh-token/'  + value ,payload);
    }

    isUserLoggedIn() {
      return localStorage.getItem('token') != null;
    }

    getToken() {
      return localStorage.getItem('accesstoken');
    }
    getRefreshToken() {
      console.log('hello');
      return localStorage.getItem('refreshtoken') ;
    }

    SaveTokens(tokendata: any) {
      localStorage.setItem('accessToken', tokendata.accessToken);
      // console.log(localStorage.setItem('refrestoken', tokendata.accessToken));
      
      localStorage.setItem('refreshtoken', tokendata.refreshToken);
      // console.log(localStorage.setItem('refreshtoken', tokendata.refreshToken));
      
    }
     // checking if user is logged in
  loggedIn() {
    this.loggedinUser = localStorage.getItem('token');
    return (this.loggedinUser = JSON.parse(this.loggedinUser));
  }

      // checking with refresh token
      logout() {

    
        localStorage.clear();
        localStorage.removeItem('expiration');
        localStorage.removeItem('refreshtoken');
        this.router.navigateByUrl('/signin');
      
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
      localStorage.removeItem('accesstoken')
      return localStorage.removeItem('token');
    }

  haveaccess(token:any){
    let _token =token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    console.log(this.tokenresp.role);
    console.log(this.tokenresp);
    localStorage.setItem('expiration', this.tokenresp.exp);

    
    return this.tokenresp.role
  }
}
