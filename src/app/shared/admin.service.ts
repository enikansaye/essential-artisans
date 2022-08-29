import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient, private apiUrl: ApiService) { }

  getUser() {
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Admin/customers').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getArtisan() {
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/App/artisans').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  // get artisan by id
  getArtisanbyid(id:string) {
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Artisan'+id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  // deleteArtisan(id:number) {
  //   return this.http.get<any>('https://randomuser.me/api/?results=5000'+id).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }
  // getOthers() {
  //   return this.http.get<any>('https://jsonplaceholder.typicode.com/posts').pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }
  // getOthersById(id:number) {
  //   return this.http.get<any>('https://jsonplaceholder.typicode.com/posts'+id).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }



  postServiceCategory(data: any) {
    return this.http.post<any>(this.apiUrl.baseUrl +'/api/Admin/ServiceCategory/create', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getServiceCategory() {
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/ServiceCategory/all').pipe(
      map((res: any) => {
        return res;
      })
    );
  
  }
  deleteServiceCategory(name:string) {
    return this.http.delete<any>(this.apiUrl.baseUrl +'/api/Admin/ServiceCategory/delete/' + name).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateServiceCategory(data:any ) {
    return this.http.put<any>(this.apiUrl.baseUrl +'/api/Admin/ServiceCategory/update' , data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getOrder(){
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Admin/orders').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  aproveOrderUrl(data:any,  ){
    return this.http.put<any>(this.apiUrl.baseUrl +'/api/Admin/ServiceOrder/approve', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
