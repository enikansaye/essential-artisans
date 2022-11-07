import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from '../shared/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AllurlService } from './allurl.service';
import { AuthInterceptor } from 'src/_helpers/auth.interceptor';
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

  // Content-Security-Policy: script-src 'self' https://myexample.com

  public baseUrl: string = "https://essential-artisans.azurewebsites.net";
  // public baseUrl: string = 'https://localhost:7130';

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
    // private tokenStorage: StorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
  
  }

  // user signup
  registerUser(model: any) {
    return this.http.post(
      this.baseUrl + '/api/Auth/register/customer',
      model,
      httpOptions
    );
  }

  // resend Email
  ResendEmail(model: any) {
    return this.http.get(
      this.baseUrl + '/api/Auth/resend/'+ model
    );
  }

  //artisan loginin
  signupArtisan(data: any) {
    return this.http.post<any>(
      this.baseUrl + '/api/Auth/register/partner',
      data,
      httpOptions
    );
  }

  


  getUserinfo() {
    return this.http.get(this.baseUrl + '/api/Customer/');
  }
  getArtisaninfo() {
    return this.http.get(this.baseUrl + '/api/Artisan/');
  }


  userUpdate(userInfo: any) {
    return this.http.put(this.baseUrl + '/api/Customer/update', userInfo);
  }

  // update user
  updateUser1(model: any) {
    const formData = new FormData();
    formData.append('profileimage', model.file);
    return (
      this.http.put(this.baseUrl + '/api/Artisan/update', model).pipe(
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

  

 

  updateUser(userInfo: any) {
    return this.http.put(
      this.baseUrl + '/api/Artisan/update',
      userInfo,
      httpOptions
    );
    // public updateArtisan : string =  this.baseUrl+ '/api/Artisan/update';
  }
  check(data: string): Observable<HttpEvent<any>> {
    //     const formData: FormData = new FormData();
    //  formData.append('file', file);

    const req = new HttpRequest(
      'PUT',
      this.baseUrl + '/api/Artisan/update',
      data
    );

    return this.http.request(req);
  }

  confirmEmail(data: any) {
    return this.http.get(this.baseUrl + '/api/Auth/verify-email', data);
  }
  resetPassword(data: any) {
    return this.http.post(this.baseUrl + '/api/Auth/reset-password', data);
  }
  forgetPassword(data: any) {
    return this.http.post(this.baseUrl + '/api/Auth/forgot-password', data);
  }

  getUser() {
    return this.http.get<any>(this.baseUrl + '/​api​/Admin​/customers').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUserOrder() {
    return this.http.get(this.baseUrl + '/api/Customer/orders').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateUserOrder() {
    return this.http
      .get(this.baseUrl + '/api/Customer/ServiceOrder/update')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //  create service
  createService(data: any) {
    // const formData = new FormData();
    return this.http
      .post<any>(this.baseUrl + '/api/Customer/ServiceOrder/create', data)
      .pipe();
  }


  //  create invoice by artisans
  createInvoice(data: any) {
    return this.http
      .post(this.baseUrl + '/api/Artisan/invoice/create', data)
      .pipe();
  }

  uploadService(data: any) {
    return this.http.post<any>(
      this.baseUrl + '/api/Customer/ServiceOrder/upload',
      data
    );
  }
  // delete service order
  deleteUser() {
    return this.http
      .delete<any>(this.baseUrl + '/api/Customer​/ServiceOrder/delete')
      .pipe(
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

  deletes(data: any) {
    const req = new HttpRequest(
      'DELETE',
      this.baseUrl + '/api/Customer/ServiceOrder/delete',
      data,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  // // checking with refresh token
  // Logout() {
  //   alert('Your session expired, kindly login');
  //   localStorage.clear();
  //   this.router.navigateByUrl('signin');
  // }

  // this is is to get a default artisans
  getAll(): any {
    return this.http.get<any>(this.baseUrl + '/api/App/locations');
  }
  getLocation(): any {
    return this.http.get<any>(this.baseUrl + '/api/App/locations');
  }
  getLocation2(state: string): any {
    return this.http.get<any>(this.baseUrl + '/api/App/locations/' + state);
  }

  sortArtisanLocation(data:any){
    return this.http.get<any>(this.baseUrl + '/api/App/artisans/location',data);
  }
  postRating(data: any) {
    return this.http.post(this.baseUrl + '/api/Customer/Review/create/', data);
  }

  

  // Returns an observable
  upload2(file: any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file);

    // Make http post request over api
    // with formData as req
    return this.http.post(
      this.baseUrl + '/api/Customer/ServiceOrder/upload',
      formData
    );
  }
  getArtisanByService(name: string) {
    return this.http.get(
      this.baseUrl + '/api/ServiceCategory/ServiceCategory/artisans/' + name
    );
  }

  artisanGetPendingOrders() {
    return this.http
      .get<any>(this.baseUrl + '/api/Artisan/ServiceOrder/pending')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  userGetPendingOrders() {
    return this.http
      .get<any>(this.baseUrl + '/api/Customer/ServiceOrder/pending')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  userGetApprovedInvoice() {
    return this.http
      .get<any>(this.baseUrl + '/api/Customer/customer/approved/invoices')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  userGetInvoice() {
    return this.http
      .get<any>(this.baseUrl + '/api/Customer/customer/invoices')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getInvoiveById(data: any, id:number) {
    return this.http
      .get<any>(this.baseUrl + '/api/Invoice/getinvoice/' +id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  customerApproveInvoice( data:any, id:number) {
   
    return this.http
      .put<any>(this.baseUrl + '/api/Customer/invoice/accept/'+id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  customerCancelInvoice(data: any, id: number) {
   
    return this.http
      .put<any>(this.baseUrl + '/api/Customer/invoice/cancel/' +id , data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  updateInspectionDate(data: any) {
   
    return this.http
      .put<any>(this.baseUrl + '/api/Customer/inspection-date/change', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  userCompletedOrder(){
    return this.http.get<any>(this.baseUrl + '/api/Customer/ServiceOrder/completed')
    .pipe(
      map((res:any) =>{
        return res
      })
    )
  }
  getOrderById(data:any, id: number){
    return this.http.get<any>(this.baseUrl + '/api/Customer/getorder/' + id, data).pipe(
       map((res: any) => {
         return res;
       })
     );
    }

  
    //  read notification api
    readNotification(data:any){
      return this.http.put<any>(this.baseUrl + "/api/Notification",data)
    }


  // uploadCheck(
  //   id: any,
  //   Name: string,
  //   ArtisanId: any,
  //   PropertyAddress: string,
  //   // InspectionDate: string,
  //   // InspectionTime: string,
  //   PhoneNumber: any,
  //   AlternateNumber: any,
  //   Issue: string,
  //   profile: string,
  //   Files: string,
  //   ArtisanEmail: string,
  //   OrderId: any,
  // ): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('id',id),
  //   formData.append("Name", Name),
  //     formData.append("ArtisanId", ArtisanId),
  //       formData.append("PropertyAddress", PropertyAddress),
  //         // formData.append("InspectionDate", InspectionDate),
  //           // formData.append("InspectionTime",InspectionTime),
  //             formData.append(" PhoneNumber", PhoneNumber),
  //               formData.append(" AlternateNumber", AlternateNumber),
  //                 formData.append("Issue", Issue),
  //                   // formData.append("profile", string),
  //                     formData.append(" Files", Files),
  //                       formData.append(" ArtisanEmail", ArtisanEmail),
  //                         formData.append(" OrderId",OrderId );

  //   return this.http.post(this.baseUrl +'/api/Customer/ServiceOrder/create', formData, {
  //     reportProgress: true,
  //     responseType: 'json',
  //     observe:'events'
  //   }).pipe(
  //     catchError((err:any)=>{
  //       alert(err.message);
  //       return throwError(err.message)
  //     })
  //   );

  // }

  // checkCheck(data:any){
  //   return this.http.post(this.baseUrl +'/api/Customer/ServiceOrder/create',data)
  // }


  
}
