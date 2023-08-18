import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AvatarModule } from 'ngx-avatar';
import { ArtisansRoutingModule } from '../artisans/artisanprofile/artisans-routing.module';
import { WalletComponent } from './wallet/wallet.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { UsertransactionComponent } from './usertransaction/usertransaction.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomerComponent } from './customer.component';
// import { EmptycartComponent } from '../emptycart/emptycart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QuoteComponent } from './quote/quote.component';


@NgModule({
  declarations: [
    WalletComponent,
    UserprofileComponent,
    PaymentComponent,
    UsertransactionComponent,
    CustomerComponent,
    QuoteComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CommonModule,
    FormsModule,
    ArtisansRoutingModule,
    ReactiveFormsModule,
    AvatarModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule


  ]
})
export class CustomerModule { }
