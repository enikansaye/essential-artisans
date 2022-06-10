import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
// const TOKEN_KEY = 'accessToken';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
// const USER_KEY = 'auth-user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }
  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
    console.log(token);
    
  }
  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }
  public saveUser(user: any): void {
   localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  }

  // signOut(): void {
  //   // window.sessionStorage.clear();
  //   localStorage.clear();
  // }
  // public saveToken(token: string): void {
  //   // window.sessionStorage.removeItem(TOKEN_KEY);
  //   localStorage.removeItem('token');
  //   // window.sessionStorage.setItem(TOKEN_KEY, token);
  //   localStorage.setItem('token', token);
  //   const user = this.getUser();
  //   if (user.data.id) {
  //     this.saveUser({ ...user, accessToken: token });
  //   }
  // }
  // public getToken(): string | null {
  //   // return window.sessionStorage.getItem(TOKEN_KEY);
  // return  localStorage.getItem('token');
  // }
  // public saveRefreshToken(token: string): void {
  //   // window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
  //   localStorage.removeItem(REFRESHTOKEN_KEY);
  //   // window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  //   localStorage.setItem(REFRESHTOKEN_KEY, token);
  // }
  // public getRefreshToken(): string | null {
  //   // return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  // return  localStorage.getItem(REFRESHTOKEN_KEY);
  // }
  // public saveUser(user: any): void {
  //   // window.sessionStorage.removeItem(USER_KEY);
  //   localStorage.removeItem(USER_KEY);
  //   // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  //   localStorage.setItem(USER_KEY, JSON.stringify(user));
  // }
  // public getUser(): any {
  //   // const user = window.sessionStorage.getItem(USER_KEY);
  //   const user =  localStorage.getItem(USER_KEY,);
  //   if (user) {
  //     return JSON.parse(user);
  //   }
  //   return {};
  // }
