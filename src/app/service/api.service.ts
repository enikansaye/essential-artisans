import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public authUrl: string =
    'https://lyticalartisanapi.azurewebsites.net/api/Auth/register/customer';
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<any>('http://fakestoreapi.com/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  forgetpassword() {}
  getAllEmployee() {}

  // customer signup
  signupUser(data: any) {
   return this.http.post<any>(this.authUrl, data);
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
}

// location api
// http://locationsng-api.herokuapp.com/api/v1/states/lagos/lgas
