import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, throwError ,catchError, empty} from 'rxjs';
import {  filter, switchMap, take, tap } from 'rxjs/operators';
// import { StorageService } from 'src/app/service/storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { LoginService } from 'src/app/service/login.service';

const TOKEN_HEADER_KEY = 'x-access-token';

const refresh = false;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  static accessToken: '';
  refresh = false;
 checkerr!:string;

  constructor(
    // private token: StorageService,
    private authService: AuthService,
    private http: HttpClient,
    private api: ApiService,
    private loginApi: LoginService,
    private inject: Injector
  ) {}

  refreshingAccessToken!: boolean ;

  accessTokenRefreshed: Subject<any> = new Subject();


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    request = this.AddTokenheader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log(error.status);


        if (error.status === 401) {
          // refresh the access token
          return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                request = this.AddTokenheader(request);
                return next.handle(request);
              }),
              catchError((err: any) => {
                // console.log(err);
                // window.location.reload();
                this.loginApi.logout();
                return empty();
              })
            )
        }

        return throwError(error);
      })
    )
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the login service to send a request to refresh the access token
      return this.loginApi.getNewAccessToken().pipe(
        tap((res:any) => {
          // console.log(res);
          
          // console.log("Access Token Refreshed!");
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next(res);
        })
      )
    }
    
  }


  // addAuthHeader(request: HttpRequest<any>) {
  //   // get the access token
  //   const token = this.getAccessToken();

  //   if (token) {
  //     // append the access token to the request header
  //     return request.clone({
  //       setHeaders: {
  //         'x-access-token': token
  //       }
  //     })
  //   }
  //   return request;
  // }

AddTokenheader(request: HttpRequest<any>) {
  const token = this.loginApi.getToken();
  // console.log(token);
  

  if(token){
     request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });

  }
  return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });

}  
  
}

