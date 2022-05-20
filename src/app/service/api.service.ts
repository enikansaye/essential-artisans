import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  public authUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/';

  public userUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/​/api​/Admin​/customers';

    // GET
    // ​/api​/Admin​/customers
    
    // GET
    // ​/api​/Admin​/orders

  public userSignupUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/register/customer';

  public userSigninUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/login';
  public emailUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/verify-email';
  public passwordresetUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/reset-password';
  public forgetpasswordUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/forgot-password';

  userProfile: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
    id: 0,
    firstName: '',
    lastName:'',
    email: '',
    phone: '',
    password: '',
  });
  // items!: User[],

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
  
  }

  getProduct() {
    return this.http.get<any>('http://fakestoreapi.com/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // user signup
  signupUser(data: any) {
    
    return this.http.post<any>(this.userSignupUrl, data);
  }
  // user signin
  signinUser(data: any) {
  
    return this.http.post<any>(
      this.userSigninUrl,
      data
   
    );
 
  }

  // profile() {
  //   return localStorage.getItem('token')
  // }
  profile() {
    return this.http.get<UserModel>(this.userSigninUrl);
  }
  // profileData() {
  //   return this.http.get<string>(this.userUrl, {
  //     withCredentials:true
  //   });
  // }
  

  saveUserToLocalStorage(data: UserModel) {
    this.userProfile.next(data);
    localStorage.setItem('token', JSON.stringify(data));
   
  }
 

  loadUserFromLocalStorage(): UserModel{
    if(this.userProfile.value.id ==0){
      let fromLocalStorage = localStorage.getItem('token')
      if(fromLocalStorage){
        let userInfo= JSON.parse(fromLocalStorage)
        this.userProfile.next(userInfo)
      }
    }
    return this.userProfile.value
  }

  confirmEmail(data: any) {
    return this.http.get(this.emailUrl, data);
  }
  resetPassword(data: any) {
    return this.http.post(this.passwordresetUrl, data);
  }
  forgetPassword(data: any) {
    return this.http.post(this.forgetpasswordUrl, data);
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

  // postUser(data: any) {
  //   return this.http.post<any>('http://localhost:3000/posts', data).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }
  // getUser(id: number) {
  //   return this.http.get(this.authUrl).pipe(
  //     map((res: any) => {
  //             return res;
  //         })
  //   )
  // }
  //

  getUser() {
    return this.http.get<any>(this.userUrl ).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getArtisan() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // getUser(id:number) {
  //   return this.http.get<any>(this.userUrl).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }
  // deleteUser(id:number) {
  //   return this.http.delete<any>('http://localhost:3000/posts/' + id).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  // updateUser(data:any, id:number) {
  //   return this.http.put<any>('http://localhost:3000/posts/' + id , data).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }
}
