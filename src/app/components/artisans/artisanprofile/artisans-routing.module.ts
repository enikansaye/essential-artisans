import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtisanprofileComponent } from './artisanprofile.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ArtisantransactionsComponent } from '../artisantransactions/artisantransactions.component';
import { WalletComponent } from './wallet/wallet.component';
import { QuoteComponent } from '../quote/quote.component';

const routes: Routes = [
  { path: '',
  component: ArtisanprofileComponent,
  canActivate:[AuthGuard],
  children: [
    {
      path: 'transactions',
      component: ArtisantransactionsComponent,

    },
    {
      path: 'profile',
      component: ProfileComponent,

    },
    {
      path: 'invoice',
      component: InvoiceComponent,

    },
    {
      path: 'wallet',
      component: WalletComponent,

    },
    {
      path: 'quote',
      component: QuoteComponent,

    },
    // {
    //   path: 'transactions',
    //   component: ArtisantransactionsComponent,

    // },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtisansRoutingModule { }
