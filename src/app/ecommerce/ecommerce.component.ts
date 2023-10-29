import { Component, OnInit } from '@angular/core';
import { CartsService } from './service/carts.service';
import { EcommerceService } from './service/ecommerce.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
public totalItem : number = 0;
apiLength : any;

  constructor(
    public cartService:CartsService,
    public orderService :EcommerceService,
    public loginApi: LoginService

  ) { }

  ngOnInit(): void {
    this.cartService.getItemLength();
    

    
    if(this.loginApi.loggedIn()){
      this.orderService.getCartProduct().subscribe(res => {
        // this.apiLength = res.length
  // this.apiLength = localStorage.getItem("counter");
  this.cartService.getCartItems()
  .subscribe(value => {
    
      this.apiLength = value;
  });
        
      })
}else{
  this.apiLength = this.cartService.value.length;
}
    
//     this.cartService.getProducts().subscribe(res => {
// this.totalItem = parseInt(localStorage.getItem('counter') as string) || 0;

// // return localStorage.setItem('cartItemsNo2', JSON.stringify(this.totalItem));

//     })
  }

}
