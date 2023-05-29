import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ArtisansComponent } from './artisans/artisans.component';
import { ServicecategoryComponent } from './servicecategory/servicecategory.component';
import { UsersComponent } from './users/users.component';
import { AlltransactionsComponent } from './alltransactions/alltransactions.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { QuoteComponent } from './quote/quote.component';
import { ProductComponent } from './product/product.component';
import { FinanceComponent } from './finance/finance.component';

const routes: Routes = [
  { path: '',
  component: AdminComponent,
  canActivate:[AuthGuard],
  children: [
    {
      path: 'Dashboard',
      component: AdminpageComponent,

    },
    {
      path: 'ServiceCategory',
      component: ServicecategoryComponent,
    },
    {
      path: 'All Artisans',
      component: ArtisansComponent,
    },
    {
      path: 'All Users',
      component: UsersComponent,
    },
    {
      path: 'All Transactions',
      component: AlltransactionsComponent,
    },
    {
      path: 'All Invoices',
      component: QuoteComponent,
    },
    {
      path: 'Products',
      component: ProductComponent,
    },
    {
      path: 'Finance',
      component: FinanceComponent,
    },

   {
     path: '',
     redirectTo: 'Dashboard',
     pathMatch: 'full',
   },
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
