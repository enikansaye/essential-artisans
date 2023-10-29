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
import { JwtHelperService } from '@auth0/angular-jwt';
// import * as CryptoJS from 'crypto-js';

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
  key!: '1234';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    // private alertService: AlertService,
    private toastr: ToastrService,
    private authApi: AuthService,
    private loginApi: LoginService
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

    this.roleDisplay();
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
   
    const clickedItem = localStorage.getItem('name');

   
    const registerObserver = {
      next: (result: any) => {
        this.responsedata = result;

        console.log(this.responsedata);

        localStorage.setItem('accesstoken', this.responsedata.data.accessToken);

       
          localStorage.setItem(
            'token',
            JSON.stringify(this.responsedata.data.accessToken)
          )
        

        this.roleDisplay();

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.toastr.success('Welcome you are logged in');
        if (this.displayUser && clickedItem) {
          console.log("helo world");
          
        
            console.log("helo world22");
    
            // this.router.navigate(['/available artisan']);
            this.router.navigate(['available artisan']).then(() => {
              window.location.reload();
            }); 
    
         
    
        }else if (this.displayArtisan) {
          this.router.navigate(['/artisanprofile/transactions']).then(() => {
            window.location.reload();
          });
        } else if (this.displayUser) {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/Admin/']).then(() => {
            window.location.reload();
          });
        }
      
      },
      error: (err: any) => {
        if(typeof err.error === "object"){
          this.errorMessage = "Complete all fields for the best service.";
        }else {
          this.errorMessage = err.error;
        }
      },
    };

    this.loginApi.loginUser(this.signinForm.value).subscribe(registerObserver);
 
  }

  reloadPage(): void {
    window.location.reload();
  }
  Logout() {
    this.loginApi.logoutUser().subscribe(() => {
      // localStorage.clear();
      localStorage.removeItem('expiration');
      localStorage.removeItem('refreshtoken');
      localStorage.removeItem('accesstoken');
      this.router.navigateByUrl('/signin');
    });
  }

  sendLink() {
    this.hidden = !this.hidden;
  }

  resendConfirmationMail(data: any) {
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
  // private encrypt(txt: string): string {
  //   return CryptoJS.AES.encrypt(txt, this.key).toString();
  // }

  // private decrypt(txtToDecrypt: string) {
  //   return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
  //     CryptoJS.enc.Utf8
  //   );
  // }
}
