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
  // get artisan by id
  getArtisanbyid(id:string) {
    return this.http.get<any>('https://lyticalartisanapi.azurewebsites.net/api/Artisan'+id).pipe(
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



  postServiceCategory(data: any) {
    return this.http.post<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/create', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getServiceCategory() {
    return this.http.get<any>('https://lyticalartisanapi.azurewebsites.net/api/ServiceCategory/all').pipe(
      map((res: any) => {
        return res;
      })
    );
  
  }
  deleteServiceCategory(name:string) {
    return this.http.delete<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/delete/' + name).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateServiceCategory(data:any, newName:string ) {
    return this.http.put<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/update' +newName, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getOrder(){
    return this.http.get<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/orders').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  aproveOrderUrl(data:any,  ){
    return this.http.put<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceOrder/approve', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
