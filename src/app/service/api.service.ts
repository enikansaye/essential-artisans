import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../shared/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AllurlService } from './allurl.service';
import { AuthInterceptor } from 'src/_helpers/auth.interceptor';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { FileToUpload } from '../file-upload/file-to-upload';

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


  public baseUrl:string =  "https://localhost:7130"

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
    return this.http.post( this.baseUrl + '/api/Auth/register/customer', model, httpOptions);
  }

  //artisan loginin
  signupArtisan(data: any) {
    return this.http.post<any>( this.baseUrl+ '/api/Auth/register/partner', data, httpOptions);
  }
// refresh token
  refreshToken(token: string) {
    return this.http.post(
       this.baseUrl+ '/api/Auth/refresh-token',
      {
        refreshToken: token,
      },
      httpOptions
    );
  }
 
  // login user
  loginUser(usercard: any) {
    return this.http.post( this.baseUrl+ '/api/Auth/login', usercard,
      // {withCredentials:true}
      );
  }
getUserinfo(id:string){
  return this.http.get( this.baseUrl+ '/api/Customer/')

}
getArtisaninfo(){
  return this.http.get( this.baseUrl+ '/api/Artisan/')
}


  isUserLoggedIn() {
    return localStorage.getItem('token') != null;
  }


  getUserToken() {
      return localStorage.getItem('accesstoken');
  }
  getRefresToken() {
    console.log('hello');
    return localStorage.getItem('accessToken') || '';
  }

  GenerateRefreshToken() {
    let input = {
    
      "refreshToken": this.getRefresToken()
    } 
    return this.http.post( this.baseUrl+ '/api/Auth/refresh-token', input);
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
    return this.http.put( this.baseUrl+ '/api/Customer/update', userInfo);
  }
  artisanUpdate(ArtisanInfo: any) {
  
      return this.http.put( this.baseUrl+ '/api/Artisan/update', ArtisanInfo);
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
      this.http.put( this.baseUrl+ '/api/Artisan/update', model).pipe(
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


  // picture upload
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
 formData.append('file', file);
 
    const req = new HttpRequest('POST',this.baseUrl+ '/api/Artisan/upload-profile-image', formData, {
      reportProgress: true,
      responseType: 'json',
    },);
  
    
    return this.http.request(req);

  
  }

  // onUpload(files: any): void{
   
  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);

  //   this.http.post( this.baseUrl+ '/api/Artisan/upload-profile-image', formData, {reportProgress: true, observe: 'events'})
  // }

  uploadIssue(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
 formData.append('file', file);
 
    const req = new HttpRequest('POST',  this.baseUrl+ '/api/Customer/ServiceOrder/upload', formData, {
      reportProgress: true,
      responseType: 'json',
    });
  
  
    
    return this.http.request(req);

  
  }

  updateUser(userInfo: any, ){
    return this.http.put( this.baseUrl+ '/api/Artisan/update', userInfo,  httpOptions);
    // public updateArtisan : string =  this.baseUrl+ '/api/Artisan/update';
}
  check(data:string): Observable<HttpEvent<any>> {
//     const formData: FormData = new FormData();
//  formData.append('file', file);
 
    const req = new HttpRequest('PUT',this.baseUrl+ '/api/Artisan/update', data );
  
    
    return this.http.request(req);

  
  }



  confirmEmail(data: any) {
    return this.http.get( this.baseUrl+ '/api/Auth/verify-email', data);
  }
  resetPassword(data: any) {
    return this.http.post( this.baseUrl+ '/api/Auth/reset-password', data);
  }
  forgetPassword(data: any) {
    return this.http.post( this.baseUrl+ '/api/Auth/forgot-password', data);
  }

  // location selection api
  // getAllStateData() {
  //   return this.http
  //     .get<any>('http://locationsng-api.herokuapp.com/api/v1/states/lagos/lgas')
  //     .pipe(
  //       map((res: any) => {
  //         return res;
  //       })
  //     );
  // }

  getUser() {
    return this.http.get<any>( this.baseUrl+ '/​api​/Admin​/customers').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getArtisanOrder(){
    return this.http.get(this.baseUrl + "/api/Artisan/orders").pipe(
      map((res:any)=>{
        return res;
      })
    )
  }
  getUserOrder(){
    return this.http.get(this.baseUrl + "/api/Customer/orders").pipe(
      map((res:any)=>{
        return res;
      })
    )
  }
  updateUserOrder(){
    return this.http.get(this.baseUrl + "/api/Customer/ServiceOrder/update").pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

  getArtisan() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  //  create service
  createService(data:any, ) {
    const formData = new FormData();
    return this.http.post<any>( this.baseUrl+ '/api/Customer/ServiceOrder/create', data).pipe();
  }
  // fake api
  // createService2(data:any, id:number) {
  //   return this.http.put<any>(this.url.createService + id , data).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  //  create invoice by artisans
  createInvoice(data:any) {
    return this.http.post( this.baseUrl+ '/api/Artisan/invoice/create',data).pipe();
  }
 
  uploadService(data: any) {
    return this.http.post<any>( this.baseUrl+ '/api/Customer/ServiceOrder/upload', data);
  }
  // delete service order
  deleteUser() {
    return this.http.delete<any>( this.baseUrl+ '/api/Customer​/ServiceOrder/delete' ).pipe(
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
  updateService(userInfo: any){
    return this.http.put(this.baseUrl + "/api/Customer/ServiceOrder/update", userInfo);
}


deletes(data:any){

  const req = new HttpRequest('DELETE',  this.baseUrl+ '/api/Customer/ServiceOrder/delete' ,data, {
    reportProgress: true,
    responseType: 'json',
  });

  


  
  return this.http.request(req);

}




  

// checking with refresh token
Logout() {
  alert('Your session expired, kindly login')
  localStorage.clear();
  this.router.navigateByUrl('signin');
}

// this is is to get a default artisans
getAll():any{
  return this.http.get<any>( this.baseUrl + '/api/App/locations')
}
getLocation():any{
  return this.http.get<any>( this.baseUrl + '/api/App/locations')
}
getLocation2(state:string):any{
  return this.http.get<any>( this.baseUrl + '/api/App/locations/' +state)  
}

sortArtisanLocation():any{
  return this.http.get<any>( this.baseUrl+ '/api/App/artisans/location')
}
postRating(data:any, ) {
  return this.http.post( this.baseUrl+ '/api/Customer/Review/create/' ,data);
}

generateInvoice(data:any){
  return this.http.post( this.baseUrl+ '/api/Artisan/invoice/create',data)
}

uploadFile(theFile: FileToUpload) : Observable<any> {
  return this.http.post<FileToUpload>( this.baseUrl+ '/api/Customer/ServiceOrder/upload', theFile, httpOptions);
}

  // Returns an observable
  upload2(file:any):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, );
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseUrl + "/api/Customer/ServiceOrder/upload", formData)
}

}