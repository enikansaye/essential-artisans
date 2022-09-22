import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient, private apiUrl: ApiService) { }
// get All userss
  getUser() {
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Admin/customers').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
// get all artisans
  getArtisan() {
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/App/artisans').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getPendingArtisan() {
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Admin/Artisans/pending/all').pipe(
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


// Service category section
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
// get all orders
  getOrder(){
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Admin/orders').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
// approve order
  aproveOrderUrl(data:any,  ){
    return this.http.put<any>(this.apiUrl.baseUrl +'/api/Admin/ServiceOrder/approve', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // Reject Order
  rejectOrderUrl(data:any,){
    return this.http.put<any>(this.apiUrl.baseUrl +'/api/Admin/ServiceOrder/reject', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getRejectedOrder(){
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Admin/ServiceOrder/reject').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getPendingOrder(){
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Admin/ServiceOrder/pending/all').pipe(
      map((res: any) => {
        return res
      })
    );
  }

  getQoute(){
    return this.http.get<any>(this.apiUrl.baseUrl + '/api/Admin/invoices').pipe(
      map((res:any) =>{
        return res;
      })
    )
  };

  getPendingQuote(){
    return this.http.get<any>(this.apiUrl.baseUrl + '/api/Admin/invoices/pending').pipe(
      map((res:any) =>{
        return res;
      })
    ) 
  }

  // approve Quote
  aproveQuoteUrl(data:any, id:string){
    return this.http.put<any>(this.apiUrl.baseUrl +'/api/Admin/invoice/approve/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // approve pending artisan
  aproveArtisanUrl(data:any, id:string){
    return this.http.put<any>(this.apiUrl.baseUrl +'/api/Admin/Artisan/approve/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // update or edit invoice by admin

  editQuoteUrl(data:any){
    return this.http.put<any>(this.apiUrl.baseUrl +'/api/Admin/invoice/edit', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCompletedOrder(){
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Admin/ServiceOrder/completed/all').pipe(map((res:any)=>{
      return res;
    }))
  }
  getCanceledOrder(){
    return this.http.get<any>(this.apiUrl.baseUrl +'/api/Admin/orders/cancelled').pipe(map((res:any)=>{
      return res;
    }))
  }
 suspendArtisanUrl(data:any, id: number){
  return this.http.put<any>(this.apiUrl.baseUrl + '/api/Admin/artisan/suspend/' + id, data).pipe(
    map((res: any) => {
      return res;
    })
  );
 }
 deleteArtisanUrl(data:any, id: number){
  return this.http.put<any>(this.apiUrl.baseUrl + '/api/Admin/artisan/delete/' + id, data).pipe(
    map((res: any) => {
      return res;
    })
  );
 }
 confirmPaymentUrl(data:any, id: number){
 return this.http.put<any>(this.apiUrl.baseUrl + '/api/Admin/invoice/confirmpayment/' + id, data).pipe(
    map((res: any) => {
      return res;
    })
  );
 }
 reassignArtisan1(data:any, id: number){
 return this.http.get<any>(this.apiUrl.baseUrl + '/api/Admin/category/artisans/' + id, data).pipe(
    map((res: any) => {
      return res;
    })
  );
 }
 getTotalSales(){
 return this.http.get<any>(this.apiUrl.baseUrl + '/api/Admin/totalsales').pipe(
    map((res: any) => {
      return res;
    })
  );
 }
 reassignArtisan2(data:any,){
 return this.http.put<any>(this.apiUrl.baseUrl + '/api/Admin/order/reassign', data).pipe(
    map((res: any) => {
      return res;
    })
  );
 }
} 