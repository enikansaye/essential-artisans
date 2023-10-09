import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



@Injectable({
  providedIn: 'root'
})
export class EcommerceService implements OnInit{
  // public ecommerceUrl: string = 'https://localhost:7130/api';
  public ecommerceUrl: string = 'https://essential-artisans-v2.azurewebsites.net/api';

  public productList !:any
  public lengthVal !:any


  constructor(public http: HttpClient) {
   }
  ngOnInit() {
  }


  // getAllProducts1(){
  // return  this.http.get(this.productUrl);
  // }
 
    getAllProducts(){
      return  this.http.get(this.ecommerceUrl + "/Product/products").pipe(
        map((res : any) => {
          
          return res;
        })
      );
      }
  
  // getProductById(product : any ){
  //   console.log(product);
  //    this.productList = product
  //   return this.http.get(this.productUrl + '/id')
  // }
  getProductById1(id : number ){
    
    return this.http.get(this.ecommerceUrl + '/Product/product/' + id)
  }
  getProductByCategory(id : number ){
    
    return this.http.get(this.ecommerceUrl + '/Product/products-category/' + id)
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
lengthValue : number = 0;
  addToCart (data : any): Observable<any>{
    return this.http.put<any>(this.ecommerceUrl + "/Cart/add", data).pipe(
      map((res : any) => {
        
        return res;
      })
    );
  }

  // data.service.ts
// ...


  getCartProduct(){
    return this.http.get<any>(this.ecommerceUrl + "/Cart").pipe(
      map((res : any) => {
        this.lengthVal = res
        this.lengthValue = this.lengthVal.length
        return res;
      })
    );
  }
  removeProduct(data : any){
    return this.http.put<any>(this.ecommerceUrl + "/Cart/remove", data).pipe(
      map((res : any) => {
        return res;
      })
    );
  }

}
