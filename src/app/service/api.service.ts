import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from '../shared/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AllurlService } from './allurl.service';
import { AuthInterceptor } from 'src/_helpers/auth.interceptor';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  userInfo: any;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser!: UserModel;

  public refreshTokenUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/refresh-token';

  public authUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/';

  public userUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/​/api​/Admin​/customers';

  public userSignupUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/register/customer';
  public imageUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Artisan/upload-profile-image';

  public userSigninUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/login';
  public emailUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/verify-email';
  public passwordresetUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/reset-password';
  public forgetpasswordUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/forgot-password';
    public updateArtisan : string = 'https://lyticalartisanapi.azurewebsites.net/api/Artisan/update';

    public artisaninfo:string ='https://lyticalartisanapi.azurewebsites.net/api/Artisan/'
    public userinfo:string ='https://lyticalartisanapi.azurewebsites.net/api/Customer/'
    public issueImage:string ='https://lyticalartisanapi.azurewebsites.net/api/Customer/ServiceOrder/upload'
    public location2: string ='https://lyticalartisanapi.azurewebsites.net/api/App/locations'
    public locationSearch: string ='https://lyticalartisanapi.azurewebsites.net/api/App/artisans/location'
    public rating: string ='https://lyticalartisanapi.azurewebsites.net/api/Customer/Review/create/'


  userProfile: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  loggedinUser: any;
  userResponse: any;
  tokenres: any;
  tokenresp: any;
  loggedinUser1: any;
  currentuserType: any;
  finaldata: any;


  selectedFiles?: FileList;
  her: any;
  // items!: User[],

  constructor(
    private http: HttpClient,
    private url: AllurlService,
    private tokenStorage: StorageService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    // this.loggedIn()
    this.getUserToken();
  }

  // user signup
  registerUser(model: any) {
    return this.http.post(this.userSignupUrl, model, httpOptions);
  }

  //artisan loginin
  signupArtisan(data: any) {
    return this.http.post<any>(this.url.signupArtisan, data, httpOptions);
  }
// refresh token
  // refreshToken(token: string) {
  //   return this.http.post(
  //     this.refreshTokenUrl ,
  //     {
  //       refreshToken: token,
  //       // refreshToken: token,
  //     },
  //     httpOptions
  //   );
  // }
 
  // login user
  loginUser(usercard: any) {
    return this.http.post(this.userSigninUrl, usercard,
      // {withCredentials:true}
      );
  }
getUserinfo(id:string){
  return this.http.get(this.userinfo +id)

}
getArtisaninfo(id:string){
  return this.http.get(this.artisaninfo +id)
}

  isUserLoggedIn() {
    return localStorage.getItem('token') != null;
  }


  getUserToken() {
      return localStorage.getItem('accesstoken');
  }
  getRefresToken() {
    console.log('hello hope');
    return localStorage.getItem('accessToken') || '';
  }

  GenerateRefreshToken() {
    let input = {
    
      "refreshToken": this.getRefresToken()
    } 
    return this.http.post(this.url.refreshToken, input);
  }
  // saveToken(token: any) {
  //   localStorage.setItem('accesstoken', token.accessToken);
  //   localStorage.setItem('token', token.accessToken);
  //   console.log('hello');
  // }
  SaveTokens(tokendata: any) {
    localStorage.setItem('token', tokendata.jwtToken);
    localStorage.setItem('refreshtoken', tokendata.refreshToken);
  }

  haveaccess(token: any) {
    const loggedinUser = localStorage.getItem('accesstoken') || '';
    const extracted = loggedinUser.split('.')[1];
    const _atobdata = atob(extracted);
    this.finaldata = JSON.parse(_atobdata);
    console.log(this.finaldata);
    return this.finaldata.role;
  }

  getToken() {
    console.log('hello');
    return localStorage.getItem('accessToken');
  }

  // saveUserToLocalStorage(data: UserModel) {
  //   this.userProfile.next(data);
  //   localStorage.setItem('token', JSON.stringify(data));
  // }

  userUpdate(userInfo: any) {
    console.log(userInfo);
    
    return this.http.put(this.url.updateUser, userInfo);
  }
  artisanUpdate(ArtisanInfo: any) {
  
      return this.http.put(this.url.updateArtisan, ArtisanInfo);
  }

  // fakeapi
  updateArisan2(data:any){
    return this.http.put('https://randomuser.me/api/?results=5000',data)
  }
 


  // update user
  updateUser1(model: any) {
    const formData = new FormData();
    formData.append('profileimage', model.file);
    return (
      this.http.put(this.url.updateArtisan, model).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            this.currentUser = user.userType;
          }
        })
      ),
      httpOptions
    );
  }

  // checking if user is logged in
  loggedIn() {
    this.loggedinUser = localStorage.getItem('token');
    return (this.loggedinUser = JSON.parse(this.loggedinUser));
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
    console.log(event);
    
  }  
  // public uploadImage(image: File): Observable<any> {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   return this.http.post(this.imageUrl, formData);
  // }

  // upload2(userId: string, file: File): Observable<any>{
  //   const formData = new FormData();
  //   formData.append("Photo", file, file.name);
  //   return this.http.post(this.imageUrl, formData);
  // }

  // picture upload
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
 formData.append('file', file);
 
    const req = new HttpRequest('POST', this.imageUrl, formData, {
      reportProgress: true,
      responseType: 'json',
    });
  
    
    return this.http.request(req);

  
  }


  uploadIssue(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
 formData.append('file', file);
 
    const req = new HttpRequest('POST', this.issueImage, formData, {

      reportProgress: true,
      responseType: 'json',
    });
  

    
    return this.http.request(req);

  
  }

  updateUser(userInfo: any, ){
    return this.http.put(this.updateArtisan , userInfo,  httpOptions);
    // public updateArtisan : string = 'https://lyticalartisanapi.azurewebsites.net/api/Artisan/update';
}
  check(data:string): Observable<HttpEvent<any>> {
//     const formData: FormData = new FormData();
//  formData.append('file', file);
 
    const req = new HttpRequest('PUT', this.url.updateArtisan, data );
  
    
    return this.http.request(req);

  
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







  //  create service

  createService(data:any, ) {
    return this.http.post<any>(this.url.createService , data).pipe();

  }
  // fake api
  createService2(data:any, id:number) {
    return this.http.put<any>(this.url.createService + id , data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //  create invoice by artisans
  createInvoice(data:any) {
    return this.http.post(this.url.createInvoice,data).pipe();
  }
 
  uploadService(data: any) {
    return this.http.post<any>(this.url.uploadService, data);
  }
  // delete service order
  deleteUser() {
    return this.http.delete<any>(this.url.deleteService ).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  // deleteUser(id:number) {
  //   return this.http.delete<any>(this.url.deleteService +id).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }
//   updateService(userInfo: any, userId: string){
//     return this.http.put(this.url.updateService +userId, userInfo);
// }

// checking with refresh token
Logout() {
  alert('Your session expired, kindly login')
  localStorage.clear();
  this.router.navigateByUrl('signin');
}


// location2
getAll():any{
  return this.http.get<any>(this.location2)
}

sortArtisanLocation():any{
  return this.http.get<any>(this.locationSearch)
}
postRating(data:any, ) {
  return this.http.post(this.rating ,data).pipe();

}
}