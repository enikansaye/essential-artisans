import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../service/ecommerce.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productApi : EcommerceService, private route : ActivatedRoute) { }
name !: any;
description !: any;
images !: any;
price !: any;
check !: any;
product: any;
// check !: any;
// check !: any;

  ngOnInit(): void {
    // this.name = this.productApi.productList.title;
    // this.description = this.productApi.productList.description;
    // this.price = this.productApi.productList.price;
    // this.images = this.productApi.productList.images;

    
    
    this.getproduct()
  }

  getproduct(){
    this.route.params.subscribe(params => {
      const id = params['id'];
  this.productApi.getProductById1(id).subscribe(res => {
      this.product = res
      this.name = this.product.name;
    this.description = this.product.description;
    this.price = this.product.price;
    this.images = this.product.productImages;

    
      
    })
    
    })
  }

}
