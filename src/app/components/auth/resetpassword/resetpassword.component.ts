import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetForm!: FormGroup;

  model: any = {};
  message: any;
  private token!: string;
  private email!: string;
 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private api:ApiService, 
    private toastr: ToastrService,
    private router: Router,


  ) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
     password: ['', [Validators.required ]],
      confirmPassword: ['', [Validators.required]],
      token: this.route.snapshot.queryParams['token']
          

    });

    this.model.token = this.route.snapshot.queryParamMap.get('token');
    this.model.userid = this.route.snapshot.queryParams['userid'];
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  


//   onSubmit(data:any) {

// // const resetPass = { ... this.resetForm };
// if (this.resetForm.valid && this.resetForm.value.password === this.resetForm.value.confirmPassword) {


//     const forgetPasswordObserver = {
      
//       next: (res:any) => {
// this.model.token = this.route.snapshot.queryParams['token'];



       

      
//         this.toastr.success('Password Changed');
//         this.router.navigate(['/signin']);

//       },
//       error: (err:any) => {
        
//         this.message = err.error
     
//         this.toastr.warning('Unable to change password');
//       }
//     };
  
// this.model.token = this.route.snapshot.queryParams['token'];

//     this.toastr.info('Working on changing password');
   
//     this.api.resetPassword(this.resetForm.value).subscribe(forgetPasswordObserver)
//   }

onSubmit(data: any) {
  if (this.resetForm.valid && this.resetForm.value.password === this.resetForm.value.confirmPassword) {
    const forgetPasswordObserver = {
      next: (res: any) => {
        this.model.token = this.route.snapshot.queryParams['token'];
    
           this.toastr.success('Password Changed');
             this.router.navigate(['/signin']);      },
      error: (err: any) => {
        this.message = err.error
        // this.model.token = this.route.snapshot.queryParams['token'];


      this.toastr.warning('Unable to change password');    
      }
    };
// this.model.token = this.route.snapshot.queryParams['token'];

    this.toastr.info('Working on changing password');
    this.api.resetPassword(this.resetForm.value).subscribe(forgetPasswordObserver);
  } else { 
    this.message = "Password do not match"
    this.toastr.warning('Password and Confirm Password do not match or form is invalid.');
  }
}


}
