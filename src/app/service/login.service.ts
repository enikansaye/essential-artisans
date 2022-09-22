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

    GenerateRefreshToken() {
      // let input = {
      //   "accessToken": this.getToken(),
      //   "refreshToken": this.getRefreshToken()
      //   // refreshToken: this.getRefresToken(),
      //   // refreshToken: localStorage.getItem('refreshToken') || '',
      // };
      localStorage.getItem('accesstoken');

      return this.http.get(this.api.baseUrl + '/api/Auth/refresh-token');
    }

    isUserLoggedIn() {
      return localStorage.getItem('token') != null;
    }

    getToken() {
      return localStorage.getItem('accesstoken');
    }
    getRefreshToken() {
      console.log('hello');
      return localStorage.getItem('accesstoken') || '';
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
  Logout() {
    alert('Your session expired, kindly login');
    localStorage.clear();
    this.router.navigateByUrl('/signin');
  }

  haveaccess(token:any){
    let _token =token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    console.log(this.tokenresp.role);
    
    return this.tokenresp.role
  }
}
