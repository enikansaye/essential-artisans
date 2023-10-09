import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EcommerceService } from './ecommerce.service';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  value : any
  quantity : any;
  constructor(    private orderService: EcommerceService,
    ) {
    
  }
  getProducts() {
    
    return this.productList.asObservable();
  }
  getProductFromApi(){

    this.orderService.getCartProduct()
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
    localStorage.setItem('cartItemsNoaaa1', JSON.stringify(product));

  }

  // addToCart(product: any) {
  //   // console.log("this is product : ", product);
    
  //   const items:any = localStorage.getItem('cartItems')
  //   this.quantity = parseInt(items);

  //   if(items){
  //     let storedCardItems = JSON.parse(items);
  //     // console.log("asdfghj", storedCardItems);
      
  //     this.cartItemList = [ ...storedCardItems];
  //     this.cartItemList.push(product)
  //     this.productList.next(this.cartItemList);
  //     this.getTotalPrice();
  //     // console.log(this.cartItemList);
  //     localStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  //     this.getItemLength();
      
  

  //   }else{
  //     let storedCardItems = JSON.parse(items);

  //     this.cartItemList.push(product)
  //     this.productList.next(this.cartItemList);
  //     this.getTotalPrice();
  //     // console.log(this.cartItemList);
  //     localStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  //     // console.log(localStorage.getItem('cartItems'))
  //     this.getItemLength();

  

  //   }

  // }

  addToCart(product: any) {
    const items:any = localStorage.getItem('cartItems')
    let cartItems: any[] = JSON.parse(items) || [];
    const foundItem = cartItems.find(item => item.productId === product.productId);
  
    if (foundItem) {
      foundItem.quantity += 1;
      foundItem.total = foundItem.quantity * product.price

    } else {
      product.quantity = 1;
      cartItems.push(product);
    }
  
    this.productList.next(cartItems);
    this.getTotalPrice();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.getItemLength();
  }
  

 

  getTotalPrice() {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      // console.log(a);

      grandTotal += a.price;

      // console.log(grandTotal);
      localStorage.setItem('grandTotal', JSON.stringify(grandTotal));

      // console.log(a.price * a.quantity);
    });
    return grandTotal;
  }

  getItemLength(){
    const item:any = localStorage.getItem("cartItems")
    this.value = JSON.parse(item) || [];
    // console.log(this.value.length);
    localStorage.setItem("counter", this.value.length)
    
    return this.value.length
  }
 

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
        product.total = product.quantity * product.price

      }
    });
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
