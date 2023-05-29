import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  public ecommerceUrl: string = 'https://localhost:7130/api';
  public productList !:any


  constructor(public http: HttpClient) { }


  // getAllProducts1(){
  // return  this.http.get(this.productUrl);
  // }
 
    getAllProducts(){
      return  this.http.get(this.ecommerceUrl + "/Product/get-all-products");
      }
  
  // getProductById(product : any ){
  //   console.log(product);
  //    this.productList = product
  //   return this.http.get(this.productUrl + '/id')
  // }
  getProductById1(id : number ){
    
    return this.http.get(this.ecommerceUrl + '/Product/get-product/' + id)
  }


  getServiceCategory() {
    return this.http.get<any>(this.ecommerceUrl +'/ServiceCategory/all').pipe(
      map((res: any) => {
        return res;
      })
    );
  
  }
  placeOrder(data : any) {
    return this.http.post<any>(this.ecommerceUrl +'/ProductOrder/checkout', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  
  }

}
