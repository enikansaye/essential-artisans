import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UsertransactionComponent } from './usertransaction/usertransaction.component';
import { WalletComponent } from './wallet/wallet.component';
import { QuoteComponent } from './quote/quote.component';

const routes: Routes = [
  { path: '',
  component: CustomerComponent,
  children: [
  
    {
      path: "Userprofile",
      component: UserprofileComponent,
    },
    {
      path: "Transaction",
      component: UsertransactionComponent,
    },
    {
      path: "Quote",
      component: QuoteComponent,
    },
    {
      path: "Wallet",
      component: WalletComponent,
    },
    // {
    //   path: "Booked Asset",
    //   component: BookedassetComponent,
    // },
    // {
    //   path: "Booking Asset",
    //   component: AssetbookingComponent,
    // },
    // {
    //   path: "Booking Asset/:id",
    //   component: EstateassetbookingComponent,
    // },
    
    
   
  

   {
     path: '',
     redirectTo: 'Userprofile',
     pathMatch: 'full',
   },
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {

 }
