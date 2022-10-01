import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
  } from "@angular/common/http";
  import { Injectable } from "@angular/core";
  import { Observable, Subject, throwError } from "rxjs";
  import { catchError, switchMap } from "rxjs/operators";
import { LoginService } from "src/app/service/login.service";
  
//   import { AuthService } from "../auth/auth.service";
//   import { UserSessionStoreService as StoreService } from "../store/user-session-store.service";
  
  @Injectable()
  export class SessionRecoveryInterceptor implements HttpInterceptor {
    constructor(
      private readonly store: LoginService,
      private readonly sessionService: LoginService,
    ) {}


    private _refreshSubject: Subject<any> = new Subject<any>();

    private _ifTokenExpired() {
      this._refreshSubject.subscribe({
        complete: () => {
          this._refreshSubject = new Subject<any>();
        }
      });
      if (this._refreshSubject.observers.length === 1) {
        // Hit refresh-token API passing the refresh token stored into the request
        // to get new access token and refresh token pair
        // this.sessionService.GenerateRefreshToken().subscribe(this._refreshSubject);
      }
      return this._refreshSubject;
    }
  
    private _checkTokenExpiryErr(error: HttpErrorResponse): boolean {
      return (
        error.status &&
        error.status === 401 &&
        error.error &&
        error.error.message === "TokenExpired"
      );
    }
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
            // let api = this.inject.get(LoginService);

      if (req.url.endsWith("/logout") || req.url.endsWith("/token-refresh")) {
        return next.handle(req);
      } else {
        return next.handle(req).pipe(
          catchError((error, caught) => {
            if (error instanceof HttpErrorResponse) {
              if (this._checkTokenExpiryErr(error)) {
                return this._ifTokenExpired().pipe(
                  switchMap(() => {
                    return next.handle(this.updateHeader(req));
                  })
                );
              } else {
                const err = new Error(); 
        return throwError(() => err);
              }
            }
            return caught;
          })
        );
      }
    }
  
    updateHeader(req: HttpRequest<any>) {
      const authToken = this.store.getToken();
      req = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${authToken}`)
      });
      return req;
    }
    
  }

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     let api = this.inject.get(LoginService);
//     let authreq = request;
//     authreq = this.AddTokenheader(request, api.getToken());
//     return next.handle(authreq).pipe(
//       catchError(errordata => {
//         if (errordata.status === 401) {
//           // need to implement logout
//           // api.Logout();
//           // refresh token logic
//          return this.handleRefrehToken(request, next);
//         }
//         // const err = new Error('test'); 
//         // console.log(err);
//         // this.checkerr = errordata
//         return throwError(() => errordata);
//         // return throwError(errordata);
//       })
//     );

    


//   }

//   handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
//     let api = this.inject.get(LoginService);
//     return api.GenerateRefreshToken().pipe(
//       switchMap((data: any) => {
//         api.SaveTokens(data);
//         console.log(data);
        
//         return next.handle(this.AddTokenheader(request,data.accessToken))
//       }),
//       catchError(errordata=>{
//         api.Logout();
//         console.log(errordata);
        
//         // return throwError(errordata)
//         const err = new Error('test'); 
//         return throwError(() => err);
//       })
//     );
//   }


// // }
// AddTokenheader(request: HttpRequest<any>, token: any) {
//   return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
// } 