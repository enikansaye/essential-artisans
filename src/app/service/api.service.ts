import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public userSignupUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/register/customer'; 

    public userSigninUrl: string = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/login'; 
    public emailUrl: string = 'https://lyticalartisanapi.azurewebsites.net/api/Auth/verify-email'; 
    public passwordresetUrl: string ='https://lyticalartisanapi.azurewebsites.net/api/Auth/reset-password'
    public forgetpasswordUrl: string ='https://lyticalartisanapi.azurewebsites.net/api/Auth/forgot-password'
  
  
    // POST
    // ​/api​/Auth​/forgot-password
    // Parameters
    
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<any>('http://fakestoreapi.com/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

 

  // user signup
  signupUser(data: any) {
    console.log(data)
   return this.http.post<any>(this.userSignupUrl, data);
   
  
  }
  // user signin
  signinUser(data: any) {
    console.log(data)
   return this.http.post<any>(this.userSigninUrl, data);
  
  }

  confirmEmail(data:any) {
    return this.http.get(this.emailUrl, data)
 
  }
  resetPassword(data:any) {
    return this.http.post(this.passwordresetUrl, data)
 
  }
  forgetPassword(data:any) {
    return this.http.post(this.forgetpasswordUrl, data)
 
  }

  // location selection api
  getAllStateData() {
    return this.http
      .get<any>('http://locationsng-api.herokuapp.com/api/v1/states/lagos/lgas')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postUser(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUser() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteUser(id:number) {
    return this.http.delete<any>('http://localhost:3000/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateUser(data:any, id:number) {
    return this.http.put<any>('http://localhost:3000/posts/' + id , data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}

