import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedinUser: any;
  tokencheck: any;

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
    GenerateRefreshToken() {
 return this.http.get(this.api.baseUrl + '/api/Auth/refresh-token/');
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
      console.log(tokendata);
      
      localStorage.removeItem('accesstoken');
      localStorage.setItem('accesstoken', tokendata.data.accessToken);
      // console.log(localStorage.setItem('refrestoken', tokendata.accessToken));
      
      // localStorage.removeItem('refreshtoken');
      // localStorage.setItem('refreshtoken', tokendata.data.refreshToken);
      // console.log(localStorage.setItem('refreshtoken', tokendata.refreshToken));
      
    }
     // checking if user is logged in
  loggedIn() {
    // this.loggedinUser = this.tokencheck;
    this.loggedinUser = localStorage.getItem('token');
    return (this.loggedinUser = JSON.parse(this.loggedinUser));
  }

      // checking with refresh token
      logout() {

    alert('Your Token Expired, please Login')
       return localStorage.clear();
       
    }

  haveaccess(token:any){
    console.log(token);
    this.tokencheck =token
    
    let _token =token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    console.log(this.tokenresp.role);
    console.log(this.tokenresp);
    localStorage.setItem('expiration', this.tokenresp.exp);

    
    return this.tokenresp.role
  }



  getNewAccessToken() {
    return this.http.get(`${this.api.baseUrl}/api/Auth/refresh-token/`,
     {
      headers: {
        // 'x-refresh-token': this.getRefreshToken(),
        // '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        console.log(res);
        
        this.SaveTokens(res.headers.get('accesstoken'));
      })
    )
  }
}
