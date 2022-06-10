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
    let accesstoken = request.clone({
      setHeaders: {
        Authorization: `bearer ${this.api.getUserToken()}`,
      },
    });
    console.log(accesstoken);
    return next.handle(accesstoken);
  }

//   intercept(req: HttpRequest<any>, next: HttpHandler){
//     const authToken = this.api.getUserToken();
//     const authRequest = req.clone({
//         headers: req.headers.set("Authorization", "Bearer " + authToken)
//     })
//     return next.handle(authRequest)
// }   
}
