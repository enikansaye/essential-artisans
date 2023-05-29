import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../service/ecommerce.service';
import { CartsService } from '../service/carts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  public productlist !:any;
  categoryData : any;
  item: any;

  constructor(
    private productApi : EcommerceService, 
    private cartService:CartsService,
    private router : Router,
    ) { }

  ngOnInit(): void {

    this.getproduct()
    // this.productApi.getAllProducts1()
    // .subscribe((res:any)=>{
    //   console.log(res);
      
// this.productlist = res
  //   })
  }

  addToCart(item:any){
    // console.log(item);

this.cartService.addToCart(item)


  }

  // getDetails(product : any){
  //   this.productApi.getProductById(product)
  //   console.log(product);
    
  //   console.log(product.id);
  //   this.router.navigate(["market place/details"])
    
  // }

  getProductCategory(){
    return this.productApi.getServiceCategory().subscribe(res => {
      console.log(res);
      this.categoryData = res
      
    }) 
  }
  getproduct(){
    return this.productApi.getAllProducts().subscribe(res =>{
      // console.log(res);
      this.productlist = res

      this.productlist.forEach((a:any) => {
        // console.log(a);
        
        Object.assign(a,{quantity:1, total: a.price});
        
      })
    })
  }
        productById(id : number){
    console.log(id);
    
    this.router.navigate(["market place/Product", id])

  }
  
  }


