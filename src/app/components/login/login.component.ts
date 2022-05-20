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
  data: any;

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

    // this.display()
  }
// onSubmit(){
//   const token = this.api.signinUser(this.signinForm.value)
//   if(token){
//     localStorage.setItem('token', token.email)
//   }
// }
 
// onSubmit(){
//   this.data =this.api.signinUser(this.signinForm.value)
 
//     .subscribe(
//     {
//       next: (data: UserModel) =>{
//         alert('logged in')
//         localStorage.setItem('token', this.data);
//         console.log('login succefssul')
//             //  this.router.navigate(['/dashboard']);
//       },
//       error: (err)=>{
//         alert('login failed')
//       }
//     })
//   }

//   // localStorage.setItem('token', JSON.stringify(this.data));
//   // console.log('login succefssul')
// //  this.router.navigate(['/dashboard']);
// }

// display(){
//  return localStorage.getItem(this.data)
// }
//   // onSubmit(){
//   //   this.api.signinUser(this.signinForm.value)
    
//   //   .subscribe(
//   //   {
//   //     next: (data: UserModel) =>{
//   //       alert('logged in')
//   //       localStorage.setItem('token', JSON.stringify(data));
//   //       console.log('login succefssul')
//   //            this.router.navigate(['/dashboard']);
//   //     },
//   //     error: (err)=>{
//   //       alert('login failed')
//   //     }
//   //   }
//   //   )
//   // }

  onSubmit(){
    let authFlow = this.api.signinUser(this.signinForm.value)
  // .pipe(
  //   switchMap((data) => this.profile())
  // )
  authFlow.subscribe({
    next: (data: UserModel) =>{
      this.api.saveUserToLocalStorage(data)
      alert('login succefssul')
           this.router.navigate(['/dashboard']);
           
    },
    error: (err) =>{
      alert('login failed')
    }
  })
  }

 
  // onSubmit() {
  //   this.alertService.info('Working on creating new account');
  

  //   const loginObserver = {
  //     next: (data : UserModel) => {
  //       this.api.saveUserToLocalStorage(data)
  //       alert()
  //       console.log('sucessful login');
  //       // this.alertService.success('Account Created');
  //       alert("sdfghjkl;");

  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //       this.alertService.danger(err.error.errors[0].description);
  //     },
  //   };
    

  //   this.api.signinUser(this.signinForm.value).pipe(
  //     switchMap(() => this.api.profile())
  //   ).subscribe(loginObserver)
    
  // }
}
