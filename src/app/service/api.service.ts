import { HttpClient,  } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../shared/models/user.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AllurlService } from './allurl.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  userInfo: any;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser!: UserModel;

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
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  loggedinUser: any
  userResponse: any
  // items!: User[],

  constructor(private http: HttpClient, private url: AllurlService) {}
  ngOnInit(): void {
    // this.loggedIn()
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
  register(model: any) {
 
    return this.http.post(this.userSignupUrl,model);
  }



  // user signin
  signinUser(data: any) {
    return this.http.post<any>(this.userSigninUrl, data);
  }

  // login(model: any) {
  //   return this.http.post(this.userSigninUrl, model).pipe(
  //     map((response: any) => {
  //       const user = response;
      
  //       this.saveUserToLocalStorage(user)
  //       // this.decodedToken = this.jwtHelper.decodeToken(user);
  //    console.log(user.data.email)
  //    this.decodedToken = user.data
  //    console.log(this.decodedToken.email)
     
  //     })
  //   );
  // }
  
  login(model: any) {
    return this.http.post(this.userSigninUrl, model).pipe(
      map((response: any) => {
        const user = response;
        console.log(user)
    
        // localStorage.setItem("token", user);
        //   localStorage.setItem("user", JSON.stringify(user.data));

        if (user) {
          localStorage.setItem("token", user);
          localStorage.setItem("user", JSON.stringify(user.data));
          this.decodedToken =user.data;
          this.currentUser = user.data;
        
        }
      })
    );
  }

//artisan loginin
signupArtisan(data:any){
return this.http.post<any>(this.url.signinRegister, data)
}
  saveUserToLocalStorage(data: UserModel) {
    this.userProfile.next(data);
    localStorage.setItem('token', JSON.stringify(data));

  }

  userImage(data:any,) {
    return this.http.put<any>(this.url.updateUser , data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
// update user
updateUser(model: any) {
  const formData = new FormData();
  formData.append("profileimage", model.file, );
  return this.http
    .put(
      this.url.updateUser,
      formData,
    
    )
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.currentUser = user.userType;
        }
      })
    );
}
loggedIn() {

 this.loggedinUser = localStorage.getItem('user')
 return  this.loggedinUser = JSON.parse(this.loggedinUser)



}



  // loadUserFromLocalStorage(): UserModel {
  //   if (this.userProfile.model.id == 0) {
  //     let fromLocalStorage = localStorage.getItem('token');
  //     if (fromLocalStorage) {
  //       let userInfo = JSON.parse(fromLocalStorage);
  //       this.userProfile.next(data);
  //     }
  //   }
  //   return this.userProfile.value;
  // }

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
    return this.http.get<any>(this.userUrl).pipe(
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
  //  create service
   createService(id:number) {
      return this.http.post<any>(this.url.createService, + id).pipe(
      
      );
    }
    uploadService(data:any){
return this.http.post<any>(this.url.uploadService, data)
    }
// delete service order
    deleteUser() {
    return this.http.delete<any>(this.url.deleteService).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
