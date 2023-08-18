import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'market place',
    loadChildren: () => import('./ecommerce/ecommerce.module')
      .then(m => m.EcommerceModule),
  },
  {
    path: 'Artisans',
    loadChildren: () => import('./components/components.module')
      .then(m => m.ComponentsModule),
  },
  {
    path: 'Admin',
    loadChildren: () => import('./components/admin/admin.module')
      .then(m => m.AdminModule),
  },
  {
    path: 'Customer',
    loadChildren: () => import('./components/customer/customer.module')
      .then(m => m.CustomerModule),
  },
  { path: '', component: DashboardComponent, }
  
];

@NgModule({
  declarations: [],
  
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
