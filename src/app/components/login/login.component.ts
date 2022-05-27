import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { map } from "rxjs/operators";
import { ApiService } from 'src/app/service/api.service';
import { UserModel } from 'src/app/shared/models/user.model';
import * as alertify from 'alertifyjs'

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

  onSubmi(){
    let authFlow = this.api.signinUser(this.signinForm.value)
 
  authFlow.subscribe({
    next: (data: UserModel) =>{
      this.api.saveUserToLocalStorage(data)
      alert('login succefssul')
      // alertify.success('login successful');
           this.router.navigate(['/']);
           
    },
    error: (err) =>{
      alert('login failed')
    }
  })
  }

  onSubmit() {
    this.alertService.info('Checking User Info');
  
    const loginObserver = {
      next:()=> {
     
        console.log('User logged in');
        this.router.navigate(['/']);
        this.alertService.success('Logged In');
     
      },
      error: (err: any) => {
        // this.progressBar.setError();
        console.log(err);
        this.alertService.danger('Unable to Login');
     
      }
    };
    this.api.login(this.signinForm.value).subscribe(loginObserver);

  }

 
 
    


}
