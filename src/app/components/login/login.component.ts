import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AlertService } from 'ngx-alerts';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { UserModel } from 'src/app/shared/models/user.model';
import * as alertify from 'alertifyjs';
import { AuthInterceptor } from 'src/_helpers/auth.interceptor';
import { ToastrService } from 'ngx-toastr';
// import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  jwtHelper = new JwtHelperService();

  signinForm!: FormGroup;
  hide = true;
  data: any;
  responsedata: any;
  tokenresp: any;
  errorMessage = '';
  currentRole: any;
  displayUser: any;
  displayArtisan: any;
  displayAdmin: any;
  roles: string[] = [];
  isLoggedIn = false;
  isLoginFailed = false;
  userInfo: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    // private alertService: AlertService,
    private toastr: ToastrService,
    private authApi: AuthService,
    private loginApi: LoginService,
  ) {}
  submitted = false;
  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.api.finaldata;

    this.roleDisplay() 
  }

  get signinFormControl() {
    return this.signinForm.controls;
  }

  roleDisplay() {
    if (this.loginApi.getToken() != '') {
      this.currentRole = this.loginApi.haveaccess(this.loginApi.getToken());

      console.log(this.currentRole);

      this.displayUser = this.currentRole === 'CUSTOMER';

      console.log(this.displayUser);

      this.displayArtisan = this.currentRole === 'ARTISAN';
      console.log(this.displayArtisan);
      this.displayAdmin = this.currentRole === 'ADMIN';
      console.log(this.displayAdmin);
    }
    this.loginApi.loggedIn();
  }

  login() {
    // this.alertService.info('Working on creating new account');

    const registerObserver = {
      next: (result: any) => {
        this.responsedata = result;
        console.log(this.api.finaldata);

        console.log(this.responsedata.data.userType);

          // localStorage.setItem(
          //   'accesstoken',
          //   this.responsedata.data.accessToken
          // );
          // localStorage.setItem('token', JSON.stringify(this.responsedata.data));
          // this.loginApi.SaveTokens(result.accessToken);
          // this.roleDisplay()
          localStorage.setItem('accesstoken', this.responsedata.data.accessToken);
      localStorage.setItem('refreshtoken', this.responsedata.data.refreshToken);
      localStorage.setItem('token', JSON.stringify(this.responsedata.data));
      console.log(this.responsedata);
      this.roleDisplay();
        // this.api.SaveTokens(result);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.api.haveaccess2().roles;

          console.log(this.responsedata);
          // this.toastr.success('Hello world!');
          this.toastr.success('Welcome you are logged in')
          // return this.responsedata;
          if (this.displayArtisan) {
            this.router.navigate(['/artisanprofile']).then(() => {
              window.location.reload();
            });
            // this.reloadPage();
          } else if (this.displayUser) {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          } else {
            this.router.navigate(['/admin']).then(() => {
              window.location.reload();
            });
          }
      // this.reloadPage();

      },
      error: (err: any) => {
        console.log(err.error);
       return this.errorMessage = err.error
        // this.alertService.danger('signup failed');
      },
    };

    this.loginApi.loginUser(this.signinForm.value).subscribe(registerObserver 

      // localStorage.setItem('accesstoken', this.responsedata.data.accessToken);
      // localStorage.setItem('refreshtoken', this.responsedata.data.refreshToken);
      // localStorage.setItem('token', JSON.stringify(this.responsedata.data));
      // console.log(this.responsedata);

      // const decodedUser = this.jwtHelper.decodeToken(this.responsedata.data.access_token);
      // console.log(decodedUser);
      
      // localStorage.setItem('expiration', decodedUser.exp);
      // this.userInfo.next(decodedUser);
      
      // this.roleDisplay();
      
      // this.reloadPage();

      // if (this.displayArtisan) {
      //   this.router.navigate(['/artisanprofile']).then(() => {
      //     window.location.reload();
      //   });
      //   // this.reloadPage();
      // } else if (this.displayUser) {
      //   this.router.navigate(['/']).then(() => {
      //     // window.location.reload();
      //   });
      // } else {
      //   this.router.navigate(['/admin']).then(() => {
      //     window.location.reload();
      //   });
      // }
      // this.reloadPage();
    );

    // this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
  Logout() {
    this.loginApi.logoutUser().subscribe(()=>{
  localStorage.clear();
  localStorage.removeItem('expiration');
  localStorage.removeItem('refreshtoken');
  this.router.navigateByUrl('/signin');
    })
}
}
