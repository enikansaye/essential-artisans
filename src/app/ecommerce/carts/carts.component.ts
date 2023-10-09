import { Component, OnInit, TemplateRef } from '@angular/core';
import { CartsService } from '../service/carts.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcommerceService } from '../service/ecommerce.service';
import { number } from 'echarts';
import { LoginService } from 'src/app/service/login.service';
import { ToastrService } from 'ngx-toastr';

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
  customerName!: string;
  customerAddress!: string;
  customerPhoneNumber!: string;
  customerEmail!: string;
  cartItems!: { quantity: number; productId: number; name: string }[];

  public product: any = [];
  public product2: any = [];
  public product3: any = [];
  public productObject: any = [];
  public products: any;
  public grandTotal: any;
  public productTotal: number = 0;
  modalRef?: BsModalRef;
  submitted: boolean = false;
  loading: boolean = false;
  checkout: any;
  apiData: any;
  totalAmount : any
  Amount : any;

  constructor(
    public cartService: CartsService,
    private modalService: BsModalService,
    private formbuilder: FormBuilder,
    private orderService: EcommerceService,
    public loginApi: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.cartService.getProducts().subscribe((res) => {
      this.productObject = localStorage.getItem('cartItems');
      this.product2 = JSON.parse(this.productObject) || [];


      if (this.loginApi.loggedIn() ) {
        // this.orderService.getCartProduct().subscribe((res) => {
        //   console.log(res);
        //   this.product = res;
        // });

        this.getProduct() 
      } else {
        this.product = this.product2;
        this.grandTotal = localStorage.getItem('grandTotal');
      }
      // console.log(this.product);

      // get item from database
      // if(this.loginApi.loggedIn()){

      // }else{
      //    if (this.product) {
      //   this.product = localStorage.getItem('cartItems');

      //   this.product = JSON.parse(this.product) || [];
      // }
      // }

      if (this.loginApi.loggedIn() ) {
       

        for (const data of this.product2) {
          console.log(data.name);
          const payload = {
            name: data.name,
            quantity: data.quantity,
            productId: data.productId,
          };
          console.log(payload);
        
          const valid = this.apiData;
          console.log(valid);
          if((this.product3).includes(this.product2)){
            console.log("word of wisdom");
           

          }else{
            this.orderService.addToCart(payload).subscribe((res) => {
              console.log(res);
              this.getProduct()
              console.log('hello here');
            });
          }
           
        }
      }
    });
    // this.getProduct();
  }
  addToCart(item: any) {
    console.log(item);
    if (this.loginApi.loggedIn()) {
      const payload = {
        quantity: 1,
        productId: item.productId,
        name: item.name,
      };
      console.log(payload);
      this.orderService.addToCart(payload).subscribe((res) => {
        console.log(res);
        // console.log("hello here");
        // this.cartService.addToCart(item);
        this.getProduct();
        this.toastr.success('Product added to cart successfully');
      });
    } else {
      this.cartService.addToCart(item);

      this.toastr.success('Product added to cart successfully');
    }
    
  }

  removeItem(item: any) {
    console.log(item);
    
    if (this.loginApi.loggedIn()) {
      const payload = {
        quantity: 1,
        productId: item.productId,
      };

      this.orderService.removeProduct(payload).subscribe((res) => {
        this.cartService.removeCartItem(item);
        this.toastr.success('Product removed from cart successfully');

        this.orderService.getCartProduct().subscribe((res) => {
          this.product = res;
        });
      });
    } else {
      const items: any = localStorage.getItem('cartItems');
      let cartItems: any[] = JSON.parse(items) || [];
      const foundItem = cartItems.find((cartItem) => cartItem.productId === item.productId);

      if (foundItem) {
        if (foundItem.quantity === 1) {
          cartItems = cartItems.filter((cartItem) => cartItem.productId !== item.productId);
        } else {
          foundItem.quantity -= 1;
        }
      } else {
        item.quantity = 1;
        cartItems.push(item);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cartService.removeCartItem(item);
    }
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }

  createOrder(data: any) {
    // console.log(data);
  }

  getCartItems(): {
    quantity: number;
    productId: number;
    name: string;
  }[] {
    const cartItems = this.product;

    // console.log(cartItems)

    return cartItems.map((item: any) => ({
      quantity: item.quantity,
      productId: item.productId,
      name: item.name,
    }));
  }
  placeOrder() {
    const cartItems = this.getCartItems();
    console.log(cartItems);
    

    const order = {
      productsOrdered: cartItems,
      customerName: this.customerName,
      customerAddress: this.customerAddress,
      customerPhoneNumber: this.customerPhoneNumber,
      customerEmail: this.customerEmail,
    };
    // console.log(order);
    const orderObserver = {
      next: (res: any) => {
        this.checkout = res;
        window.location.href = this.checkout.link;
      },
      error: (err: any) => {},
    };
    this.orderService.placeOrder(order).subscribe(orderObserver);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      ariaDescribedby: 'my-modal-description',
      ariaLabelledBy: 'my-modal-title',
    });
  }
  getProduct() {
    this.orderService.getCartProduct().subscribe((res) => {
      console.log(res);
      this.product = res;
    });
  }
}
