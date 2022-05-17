import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { switchMap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signinForm!: FormGroup;
  hide = true;
  data!: any

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required, ],
      password: ['', Validators.required],
    });
  }

 

  signin() {
    // console.log(this.signupForm.value);
    this.api.signinUser(this.signinForm.value).subscribe((res) => {
      alert(res.status);
      console.log(res);
      this.signinForm.reset();
      // this.router.navigate(['/dashboard']);
    });
  }

  onSubmi(){
    let authFlow = this.api.signinUser(this.signinForm)
  .pipe(
    switchMap(() => this.api.profile())
  )
  authFlow.subscribe({
    next: (data: UserModel) =>{
      this.api.saveUserToLocalStorage(data)
      alert('login succefful')
           this.router.navigate(['/dashboard']);
    },
    error: (err) =>{
      alert('login failed')
    }
  })
  }

 
  onSubmit() {
    this.alertService.info('Working on creating new account');

    const loginObserver = {
      next: (res:any) => {
        alert()
        console.log('sucessful login');
        // this.alertService.success('Account Created');
        alert(res.message);

        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.log(err);
        this.alertService.danger(err.error.errors[0].description);
      },
    };

    this.api.signinUser(this.signinForm.value).subscribe(loginObserver);
    localStorage.setItem('data', JSON.stringify(this.data))
  }
}
