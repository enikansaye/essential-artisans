import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllurlService {

  constructor(private http : HttpClient) { }
 public refreshToken : string =  'https://lyticalartisanapi.azurewebsites.net/api/Auth/refresh-token';
 public signinRegister : string =  'https://lyticalartisanapi.azurewebsites.net/api/Auth/register​/partner';
 public logouturl : string =  'https://lyticalartisanapi.azurewebsites.net/api/Auth/logout';
 public updateUser : string = 'https://lyticalartisanapi.azurewebsites.net/api/Customer/update';
 public deleteService : string = 'https://lyticalartisanapi.azurewebsites.net/api/Customer​/ServiceOrder/delete';
 public uploadService : string = 'https://lyticalartisanapi.azurewebsites.net/api/Customer/ServiceOrder/upload';
 public createService : string = 'https://lyticalartisanapi.azurewebsites.net/api/Customer/ServiceOrder/create';
}
