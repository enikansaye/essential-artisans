import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';





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
import { RegisterComponent } from './components/register/register.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { PartnerregisterComponent } from './components/partnerregister/partnerregister.component';
import { HomeComponent } from './components/home/home.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { EmailComponent } from './components/email/email.component';
import { MyorderComponent } from './components/myorder/myorder.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


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
     AddtocartComponent,
     RegisterComponent,
     PartnerregisterComponent,
     HomeComponent,
     ForgetpasswordComponent,
     EmailComponent,
     MyorderComponent,
     UserprofileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgbModule,
    MatFormFieldModule,
MatSelectModule,
MatInputModule,
MatIconModule,
MatButtonModule,
MatSidenavModule,

    RouterModule.forRoot([
      {path: "", redirectTo: 'signin', pathMatch: 'full'},
      {path: "signin" , component: LoginComponent },
      {path: "signup" , component: SignupComponent },
      // {path: "dashboard" , component: DashboardComponent },
      // {path: "aboutus" , component: AboutusComponent },
      // {path: "contactus" , component: ContactusComponent },
      // {path: "ourpolicy" , component: PolicyComponent },
      // {path: "addtocart" , component: AddtocartComponent },
      // {path: "electrician" , component: ElectricianComponent },
      // {path: "plumbing" , component: PlumbingComponent },
      // {path: "carpentary" , component: CapentaryComponent },
      // {path: "acrepair" , component: AcrepairComponent },
      {path: "register" , component: RegisterComponent },
      {path: "home" , component: HomeComponent },
      {path: "myorder" , component: MyorderComponent },
      {path: "userprofile" , component: UserprofileComponent },
      {path: "forgetpassword" , component: ForgetpasswordComponent },
      {path: "partnerregister" , component: PartnerregisterComponent },
      // {path: "acrepair/fan" , component: AcrepairComponent },

    ]),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the app is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }