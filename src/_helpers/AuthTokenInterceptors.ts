// import {
//     HttpInterceptor,
//     HttpRequest,
//     HttpHandler,
//     HttpEvent,
//   } from '@angular/common/http';
//   import { Observable } from 'rxjs';
//   import { Injectable } from '@angular/core';
//   import { switchMap, map, flatMap, take } from 'rxjs/operators';
//   import { JwtHelperService } from '@auth0/angular-jwt';
// import { LoginService } from 'src/app/service/login.service';
//   @Injectable()
//   export class AuthTokenInterceptors implements HttpInterceptor {
//     jwtHelper = new JwtHelperService();
//     constructor( private readonly authService: LoginService,) {}
//     intercept(
//       req: HttpRequest<any>,
//       next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//       if (req.url.indexOf('/refresh-token') > -1) {
//         return next.handle(req);
//       }
//       const access_token = localStorage.getItem('access_token');
//       if (access_token) {
//         const expiration = localStorage.getItem('expiration');
//         if (Date.now() < Number(expiration) * 1000) {
//           const transformedReq = req.clone({
//             headers: req.headers.set('Authorization', `bearer ${access_token}`),
            
//           });
//           return next.handle(transformedReq);
//         }
     
//         return this.authService.GenerateRefreshToken().pipe(
//           switchMap((newTokens: any) => {
//             console.log("refreeeeeeeeh",newTokens);
            
//             localStorage.setItem('access_token', newTokens.data.access_token);
//             localStorage.setItem('refresh_token', newTokens.data.refresh_token);
//             const decodedUser = this.jwtHelper.decodeToken(
//               newTokens.access_token
//             );
//             localStorage.setItem('expiration', decodedUser.exp);
//             this.authService.tokenresp.next(decodedUser);
//             const transformedReq = req.clone({
//               headers: req.headers.set(
//                 'Authorization',
//                 `bearer ${newTokens.access_token}`
//               ),
//             });
//             return next.handle(transformedReq);
//           })
//         );
//       } else {
//         return next.handle(req);
//       }
//     }
//   }