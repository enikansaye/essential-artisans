import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtisanprofileComponent } from './artisanprofile.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ArtisantransactionsComponent } from '../artisantransactions/artisantransactions.component';

const routes: Routes = [
  { path: '',
  component: ArtisanprofileComponent,
  canActivate:[AuthGuard],
  children: [
    {
      path: 'artisanprofile',
      component: ArtisanprofileComponent,

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
      path: 'transactions',
      component: ArtisantransactionsComponent,

    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtisansRoutingModule { }
