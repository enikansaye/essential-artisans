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
<<<<<<< HEAD
=======
      map((res: any) => {
        return res;
      })
    );
  }
  // get artisan by id
  getArtisanbyid(id:string) {
    return this.http.get<any>('https://lyticalartisanapi.azurewebsites.net/api/Artisan'+id).pipe(
>>>>>>> dev
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

<<<<<<< HEAD
  postService(data: any) {
    return this.http.post<any>("https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/create", data).pipe(
=======


  postServiceCategory(data: any) {
    return this.http.post<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/create', data).pipe(
>>>>>>> dev
      map((res: any) => {
        return res;
      })
    );
  }
<<<<<<< HEAD
  
  getService() {
=======

  getServiceCategory() {
>>>>>>> dev
    return this.http.get<any>('https://lyticalartisanapi.azurewebsites.net/api/ServiceCategory/all').pipe(
      map((res: any) => {
        return res;
      })
    );
<<<<<<< HEAD
  }
  deleteService(name:string) {
    return this.http.delete<any>("https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/delete" + name).pipe(
=======
  
  }
  deleteServiceCategory(name:string) {
    return this.http.delete<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/delete/' + name).pipe(
>>>>>>> dev
      map((res: any) => {
        return res;
      })
    );
  }
<<<<<<< HEAD
  
  updateService(data:any, name:string) {
    return this.http.put<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/update' +name , data).pipe(
=======

  updateServiceCategory(data:any ) {
    return this.http.put<any>('https://lyticalartisanapi.azurewebsites.net/api/Admin/ServiceCategory/update' , data).pipe(
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
>>>>>>> dev
      map((res: any) => {
        return res;
      })
    );
  }
}
