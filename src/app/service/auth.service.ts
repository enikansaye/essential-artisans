import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



const AUTH_APITOKEN = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/refresh-token';
const AUTH_APISIGNIN = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/login';
const AUTH_APISIGNUP = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/register/customer';
const AUTH_APISIGNOUT = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/logout';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_APISIGNIN ,
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_APISIGNUP,
      {
        firstName,
        lastName,
        email,
        password,
      },
      httpOptions
    );
  }
  logout(): Observable<any> {
    return this.http.post(AUTH_APISIGNOUT, { }, httpOptions);
  }


  // asdfghjk
  refreshToken(token: string) {
    return this.http.post(AUTH_APITOKEN, {
      refreshToken: token
    }, httpOptions);
  }
}
