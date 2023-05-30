import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AdminComponent } from './admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ArtisansComponent } from './artisans/artisans.component';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuoteComponent } from './quote/quote.component';
import { AlltransactionsComponent } from './alltransactions/alltransactions.component';
import { EmptycartComponent } from '../emptycart/emptycart.component';
import { ServicecategoryComponent } from './servicecategory/servicecategory.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxEchartsModule } from 'ngx-echarts'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { FinanceComponent } from './finance/finance.component';
import { OrderedproductComponent } from './orderedproduct/orderedproduct.component';


@NgModule({
  declarations: [
    AdminComponent,
    ArtisansComponent,
    UsersComponent,
    QuoteComponent,
    AlltransactionsComponent,
    // EmptycartComponent,
    AdminpageComponent,
    ServicecategoryComponent,
    ProductComponent,
    FinanceComponent,
    OrderedproductComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // HighchartsChartModule,
    // ChartModule,
    TooltipModule.forRoot(),

    NgxEchartsModule
    
    


  ]
})
export class AdminModule { }
