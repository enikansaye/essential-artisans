import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';



// const AUTH_APITOKEN = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/refresh-token/';
// const AUTH_APISIGNIN = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/login';
// const AUTH_APISIGNUP = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/register/customer';
// const AUTH_APISIGNOUT = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/logout';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private baseApi:ApiService) {}
  // user signup
  registerUser(model: any) {
    return this.http.post( this.baseApi.baseUrl + '/api/Auth/register/customer', model, httpOptions);
  }

  //artisan loginin
  signupArtisan(data: any) {
    return this.http.post<any>( this.baseApi.baseUrl+ '/api/Auth/register/partner', data, httpOptions);
  }

  // login
  loginUser(usercard: any) {
    return this.http.post( this.baseApi.baseUrl+ '/api/Auth/login', usercard,
      // {withCredentials:true}
      );
  }
  // logout(): Observable<any> {
  //   return this.http.post(AUTH_APISIGNOUT, { }, httpOptions);
  // }


  // asdfghjk
  refreshToken(token: string) {
    
    return this.http.post(this.baseApi.baseUrl +'/api/Auth/refresh-token/' + token, {
      refreshToken: token
    }, httpOptions);
  }


  
}
