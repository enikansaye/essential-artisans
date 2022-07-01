import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getUser() {
    return this.http.get<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/customers').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getArtisan() {
    return this.http.get<any>('https://lyticalartisanapi.azurewebsites.net/api/App/artisans').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteArtisan(id:number) {
    return this.http.get<any>('https://randomuser.me/api/?results=5000'+id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getOthers() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getOthersById(id:number) {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts'+id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postService(data: any) {
    return this.http.post<any>("https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/create", data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  getService() {
    return this.http.get<any>('https://lyticalartisanapi.azurewebsites.net/api/ServiceCategory/all').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteService(name:string) {
    return this.http.delete<any>("https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/delete" + name).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  updateService(data:any, name:string) {
    return this.http.put<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/update' +name , data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
