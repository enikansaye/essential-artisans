import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AlertService } from 'ngx-alerts';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { UserModel } from 'src/app/shared/models/user.model';
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
  resendForm!: FormGroup;
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
  hidden: boolean = false;
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
    this.resendForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      // password: ['', Validators.required],

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


      this.displayUser = this.currentRole === 'CUSTOMER';


      this.displayArtisan = this.currentRole === 'ARTISAN';
      this.displayAdmin = this.currentRole === 'ADMIN';
    }
    this.loginApi.loggedIn();
  }

  login() {
    // this.alertService.info('Working on creating new account');

    const registerObserver = {
      next: (result: any) => {
        this.responsedata = result;
        

// console.log(this.responsedata);

        
          localStorage.setItem('accesstoken', this.responsedata.data.accessToken);
      // localStorage.setItem('refreshtoken', this.responsedata.data.refreshToken);
      localStorage.setItem('token', JSON.stringify(this.responsedata.data.accessToken));
      // console.log(localStorage.setItem('token', JSON.stringify(this.responsedata.data.accessToken)));
      
      this.roleDisplay();
        // this.api.SaveTokens(result);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.api.haveaccess2().roles;

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
       return this.errorMessage = err.error
        // this.alertService.danger('signup failed');
      },
    };

    this.loginApi.loginUser(this.signinForm.value).subscribe(registerObserver 

   
     
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

sendLink() {
  this.hidden = !this.hidden;
}


resendConfirmationMail(data:any) {
  
  const inspectionObserver = {
    next: (res: any) => {
      
      this.router.navigate(['/checkemail']);

      this.resendForm.reset();
      this.hidden = !this.hidden;
    },
    err: (err: any) => {
      
      this.toastr.warning('Something Went wrong!!');
    },
  };
  this.loginApi
    .ResendMail(this.resendForm.value.email, this.resendForm.value.email)
    .subscribe(inspectionObserver);
}
}
