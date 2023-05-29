import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartsComponent } from './carts/carts.component';
import { EcommerceComponent } from './ecommerce.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: '',
  component: EcommerceComponent,
  children: [
    {
      path: '',
      component: LandingpageComponent,
    },
    {
      path: 'Product/:id',
      component: ProductDetailsComponent,
    },
    // {
    //   path: 'details',
    //   component: ProductDetailsComponent,
    // },
    {
      path: 'Carts',
      component: CartsComponent,
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
