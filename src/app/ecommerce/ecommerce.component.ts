import { Component, OnInit } from '@angular/core';
import { CartsService } from './service/carts.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
public totalItem : number = 0;
  constructor(
    private cartService:CartsService,
  ) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
this.totalItem = res.length;
return localStorage.setItem('cartItemsNo2', JSON.stringify(this.totalItem));

    })
  }

}
