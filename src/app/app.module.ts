import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { AddtocartComponent } from './components/addtocart/addtocart.component';


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
     AddtocartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgbModule,
    RouterModule.forRoot([
      {path: "", redirectTo: 'dashboard', pathMatch: 'full'},
      {path: "signin" , component: LoginComponent },
      {path: "signup" , component: SignupComponent },
      {path: "dashboard" , component: DashboardComponent },
      {path: "aboutus" , component: AboutusComponent },
      {path: "contactus" , component: ContactusComponent },
      {path: "ourpolicy" , component: PolicyComponent },
      {path: "addtocart" , component: AddtocartComponent },
      {path: "electrician" , component: ElectricianComponent },
      {path: "plumbing" , component: PlumbingComponent },
      {path: "carpentary" , component: CapentaryComponent },
      {path: "acrepair" , component: AcrepairComponent },
      // {path: "acrepair/fan" , component: AcrepairComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
