import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArtisansService {

  constructor(  private http: HttpClient,
    private api: ApiService,
    private router: Router,) { }

  artisanUpdate(ArtisanInfo: any) {
  
    return this.http.put( this.api.baseUrl+ '/api/Artisan/update', ArtisanInfo);
}
  getArtisanOrder(){
    return this.http.get(this.api.baseUrl + "/api/Artisan/orders").pipe(
      map((res:any)=>{
        return res;
      })
    )
  }
  getAllProduct(){
    
    return this.http.get(this.api.baseUrl + "/api/Product/artisan-category-products").pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

  generateInvoice(data:any){
    return this.http.post( this.api.baseUrl+ '/api/Artisan/invoice/create',data)
  }

  artisanGetPendingOrders(){
    return this.http.get<any>(this.api.baseUrl +'/api/Artisan/ServiceOrder/pending').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  artisanAcceptOrdersUrl(data:any){
    return this.http.put<any>(this.api.baseUrl +'/api/Artisan/order/accept',data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  artisanCancelOrderUrl(data:any){
    return this.http.put<any>(this.api.baseUrl +'/api/Artisan/order/cancel',data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  artisanCompleteOrder(id:number){
    return this.http.put<any>(this.api.baseUrl +'/api/Artisan/order/complete',id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  artisanGetCompletedOrder(){
    return this.http.get<any>(this.api.baseUrl +'/api/Artisan/ServiceOrder/completed').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  artisanGetAllInvoices(){
    return this.http.get<any>(this.api.baseUrl +'/api/Artisan/invoices').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  artisanGetCancedOrder(){
    return this.http.get<any>(this.api.baseUrl +'/api/Artisan/orders/cancelled').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getOrderById(data:any, id: number){
    return this.http.get<any>(this.api.baseUrl + '/api/Artisan/getorder/' + id, data).pipe(
       map((res: any) => {
         return res;
       })
     );
    }

      // get all service categories
  getAllServiceCategory(){
    return this.http.get(this.api.baseUrl + "/api/ServiceCategory/all/")

  }
  // get all category by id
getAllCategory(id : number){
  return this.http.get(this.api.baseUrl + "/api/Product/products-category/" + id)
 
}
// get all sub categories
getAllSubCategory(id : number){
  return this.http.get(this.api.baseUrl + "/api/Product/products-sub-category/" + id)
 
}
}
