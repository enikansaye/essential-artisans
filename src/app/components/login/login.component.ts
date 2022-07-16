import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { UserModel } from 'src/app/shared/models/user.model';
import * as alertify from 'alertifyjs';
import { AuthInterceptor } from 'src/_helpers/auth.interceptor';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signinForm!: FormGroup;
  hide = true;
  data: any;
  responsedata: any;
  tokenresp: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    private toastr: ToastrService
    
  ) {}
  submitted = false;
  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    });

    // this.display()
  }
  get signinFormControl() {
    return this.signinForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.signinForm.valid) {
      this.api.loginUser(this.signinForm.value).subscribe((result) => {
        if (result != null) {
          this.responsedata = result;
          localStorage.setItem(
            'accesstoken',
            this.responsedata.data.accessToken
          );
          localStorage.setItem('token', JSON.stringify(this.responsedata.data));
          this.router.navigate(['/']);
          console.log(this.responsedata);
          // this.toastr.success('Hello world!');
          this.toastr.success('Welcome you are logged in')
          return this.responsedata;
          
        } else {
          // console.log(this.error.checkerr);
          
          this.toastr.error('something went wrong!', 'Toastr !');
        }
      });
    }
  }

}
