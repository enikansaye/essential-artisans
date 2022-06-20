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

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { StorageService } from 'src/app/service/storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';

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
    private token: StorageService,
    private authService: AuthService,
    private http: HttpClient,
    private api: ApiService,
    private inject: Injector
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let api = this.inject.get(ApiService);
    let authreq = request;
    authreq = this.AddTokenheader(request, api.getUserToken());
    return next.handle(authreq).pipe(
      catchError(errordata => {
        if (errordata.status === 401) {
          // need to implement logout
          // api.Logout();
          // refresh token logic
         return this.handleRefrehToken(request, next);
        }
        // const err = new Error('test'); 
        // console.log(err);
        // this.checkerr = errordata
        return throwError(() => errordata);
        // return throwError(errordata);
      })
    );

    


    // let accesstoken = request.clone({
    //   setHeaders: {
        // Authorization: `bearer ${this.api.getUserToken()}`,
    //   },
    // });
    // console.log(accesstoken);
    // return next.handle(accesstoken);
  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    let api = this.inject.get(ApiService);
    return api.GenerateRefreshToken().pipe(
      switchMap((data: any) => {
        api.SaveTokens(data);
        return next.handle(this.AddTokenheader(request,data.jwtToken))
      }),
      catchError(errodata=>{
        api.Logout();
        // return throwError(errodata)
        const err = new Error('test'); 
        return throwError(() => err);
      })
    );
  }

//   intercept(req: HttpRequest<any>, next: HttpHandler){
//     const authToken = this.api.getUserToken();
//     const authRequest = req.clone({
//         headers: req.headers.set("Authorization", "Bearer " + authToken)
//     })
//     return next.handle(authRequest)
// }
AddTokenheader(request: HttpRequest<any>, token: any) {
  return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
}   
}

