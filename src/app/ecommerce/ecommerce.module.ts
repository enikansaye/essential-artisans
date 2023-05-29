import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { EcommerceComponent } from './ecommerce.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartsComponent } from './carts/carts.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EcommerceComponent,
    LandingpageComponent,
    ProductDetailsComponent,
    CartsComponent
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class EcommerceModule { }
