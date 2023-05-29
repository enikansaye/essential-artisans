import { Component, OnInit, TemplateRef } from '@angular/core';
import { CartsService } from '../service/carts.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcommerceService } from '../service/ecommerce.service';

class itemObject {
  quantity!: number;
  productId!: number;
  // total!: number;
 
}

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent implements OnInit {
  customerName !: string;
  customerAddress !: string;
  customerPhoneNumber !: string;
  customerEmail !: string;
  cartItems !: { quantity: number, productId: number, productName: string }[];


  public product: any = [];
  public products: any;
  public grandTotal: number = 0;
  public productTotal: number = 0;
  modalRef?: BsModalRef;
  submitted : boolean = false;
  loading : boolean = false;
  checkout: any;


  constructor(
    private cartService: CartsService,
    private modalService: BsModalService,
    private formbuilder : FormBuilder,
    private orderService : EcommerceService
    ) {}

  ngOnInit() {
    this.cartService.getProducts().subscribe((res) => {
      console.log(res);
      
      this.product = res;

      this.grandTotal = this.cartService.getTotalPrice();
      console.log(this.grandTotal);
      if(!this.product){
        this.product = localStorage.getItem('cartItems')
        console.log(this.product);
        
        this.product = JSON.parse(this.product) || [];
        console.log(this.product);
        
      }
    }); 
    

  }


  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }

  createOrder(data : any){
    console.log(data);
    
  }

  getCartItems(): { quantity: number, productId: number, productName: string }[] {
    const cartItems = this.product;
    console.log(cartItems)

    return cartItems.map((item: any) => ({
      quantity: item.quantity,
      productId: item.productId,
      productName: item.name
      
    }
    ));
    
  }
  placeOrder() {
    const cartItems = this.getCartItems();

    const order = {
      productsOrdered: cartItems,
      customerName: this.customerName,
      customerAddress: this.customerAddress,
      customerPhoneNumber: this.customerPhoneNumber,
      customerEmail: this.customerEmail
    };
console.log(order);
const orderObserver = {
  next: (res: any) => {
    this.checkout =res
    window.location.href = this.checkout.link;
 
  },
  error: (err: any) => {},
};
    this.orderService.placeOrder(order).subscribe( orderObserver)}
    ;
  








  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      ariaDescribedby: 'my-modal-description',
      ariaLabelledBy: 'my-modal-title',
    });
  }
}
