import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxEchartsModule } from 'ngx-echarts';
import { AlertModule } from 'ngx-alerts';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NetworkInterceptor } from './loader/network.interceptor';
import {MatMenuModule} from '@angular/material/menu';



import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { FooterComponent } from './components/footer/footer.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ZippyComponent } from './components/zippy/zippy.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PlumbingComponent } from './components/plumbing/plumbing.component';
import { ElectricianComponent } from './components/electrician/electrician.component';
import { AcrepairComponent } from './components/acrepair/acrepair.component';
import { CapentaryComponent } from './components/capentary/capentary.component';

import { RegisterComponent } from './components/register/register.component';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { EmailComponent } from './components/email/email.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ArtisanprofileComponent } from './components/artisanprofile/artisanprofile.component';

import { AdminpageComponent } from './adminComponents/adminpage/adminpage.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
// import { AllartisanComponent } from './adminComponents/allartisan/allartisan.component';
// import { AlltransactionsComponent } from './adminComponents/alltransactions/alltransactions.component';
import { ArtisansdetailsComponent } from './components/artisansdetails/artisansdetails.component';
import { SignuprouteComponent } from './components/signuproute/signuproute.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
// import { authInterceptorProviders } from '../_helpers/auth.interceptor';

// import { AuthGuard } from './service/auth-guard';
import { AuthInterceptor, } from 'src/_helpers/auth.interceptor';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { ArtisanbyidComponent } from './adminComponents/artisanbyid/artisanbyid.component';
import { ServicecategoryComponent } from './adminComponents/servicecategory/servicecategory.component';
import { NavbarComponent } from './adminComponents/navbar/navbar.component';
import { MainComponent } from './adminComponents/main/main.component';
import { BodyComponent } from './adminComponents/body/body.component';
import { AdminaddartisanComponent } from './adminComponents/adminaddartisan/adminaddartisan.component';
import { AlltransactionsComponent } from './adminComponents/alltransactions/alltransactions.component';
import { AllartisanComponent } from './components/allartisan/allartisan.component';
import { AllUsersComponent } from './adminComponents/all-users/all-users.component';
import { AdminAllArtisansComponent } from './adminComponents/admin-all-artisans/admin-all-artisans.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';

import { MatNativeDateModule } from '@angular/material/core';

import { MatDatepickerModule } from '@angular/material/datepicker';


 
// import { MainRoutingModule } from './adminComponents/main-routing.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,

    FooterComponent,
    AboutusComponent,
    PrivacyComponent,

    ZippyComponent,
    ContactusComponent,
    PolicyComponent,
    PlumbingComponent,
    ElectricianComponent,
    AcrepairComponent,
    CapentaryComponent,

    RegisterComponent,

    ForgetpasswordComponent,
    EmailComponent,
    MyorderComponent,
    UserprofileComponent,
    ArtisanprofileComponent,
    AdminpageComponent,
  
    PagenotfoundComponent,
    ForbiddenComponent,
    AllartisanComponent,
    // AlltransactionsComponent,
    ArtisansdetailsComponent,
    SignuprouteComponent,
    ResetpasswordComponent,
    InvoiceComponent,
    FilterPipe,
    SortPipe,
    ArtisanbyidComponent,
    ServicecategoryComponent,
    NavbarComponent,
    MainComponent,
    BodyComponent,
    AdminaddartisanComponent,
    AllUsersComponent,
    AdminAllArtisansComponent,
    AdminloginComponent,
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // CarouselModule,
    NgbModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    HighchartsChartModule,
    ChartModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    NgxPaginationModule,
  
    // MainRoutingModule,
  
    
    MatDatepickerModule,
    MatNativeDateModule,
    
  
  
   
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right' }),

    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        {
          path: 'signin',
          component: LoginComponent,
          data: {
            userType: 'non-logged-in',
          }
        },

        { path: '', component: DashboardComponent, },
        { path: 'signup', component: SignupComponent,   data: {
          userType: 'non-logged-in',
        }, },
        { path: 'aboutus', component: AboutusComponent },
        { path: 'contactus', component: ContactusComponent },
        { path: 'ourpolicy', component: PolicyComponent },
        {path: "service" , component: ServicecategoryComponent },
        { path: 'electrician', component: ElectricianComponent },
        { path: 'plumbing', component: PlumbingComponent },
        { path: 'carpentry', component: CapentaryComponent },
        { path: 'acrepair', component: AcrepairComponent },
        { path: 'register', component: RegisterComponent },

        { path: 'myorder', component: MyorderComponent },
        { path: 'userprofile', component: UserprofileComponent, canActivate:[RoleGuard] },
        { path: 'artisanprofile', component: ArtisanprofileComponent, canActivate:[RoleGuard]  },
        { path: 'forgetpassword', component: ForgetpasswordComponent },
        { path: 'pagenotfound', component: PagenotfoundComponent },
        { path: 'admin', component: AdminpageComponent, canActivate:[AuthGuard],  },
        { path: 'forbidden', component: ForbiddenComponent },
        { path: 'main', component: MainComponent,
          children: [
            { path: 'main', component: AdminpageComponent, },
            { path: '', component: AdminpageComponent, },
          { path: 'adminAllArtisans', component: AdminAllArtisansComponent,  },
          { path: 'adminAllUsers', component: AllUsersComponent ,},
          { path: 'servicecategory', component: ServicecategoryComponent ,},
          { path: 'allUsers', component: AllUsersComponent ,},
          { path: 'allUsers', component: AllUsersComponent ,},
          { path: 'alltransactions', component: AlltransactionsComponent },
          { path: 'artisanbyid', component: ArtisanbyidComponent },
      ] },
        {
          path: 'available artisan',
          component: AllartisanComponent,
          canActivate:[AuthGuard],
        },
       
        { path: 'confirmemail', component: EmailComponent },
        { path: 'checkemail', component: SignuprouteComponent },
        { path: 'passwordreset', component: ResetpasswordComponent },
        { path: 'invoice', component: InvoiceComponent },
        { path: 'adminlogin', component: AdminloginComponent },
        
        // { path: 'adminAllArtisans', component: AdminAllArtisansComponent,  },

       
      ],
      { scrollPositionRestoration: 'enabled' }
    ),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,  useClass: AuthInterceptor, multi:true },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
    // authInterceptorProviders
    // , useClass: ShowOnDirtyErrorStateMatcher
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
