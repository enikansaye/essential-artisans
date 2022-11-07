import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  hide= true;
  // email =strings =""
Form !: FormGroup;
  message: any;

  reset(){

  }
  constructor(    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService,

    ) { }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      email:['', Validators.required],
    
    })
  }
  onSubmit(){
    
    const forgetPasswordObserver = {
      next: (res:any) => {
       
        this.toastr.success('Kindly check your mail');

        this.router.navigate(['/checkemail']);

      },
      error: (err:any) => {
        this.message =err.error
     
        this.toastr.warning('Unable to send email');
      }
    };
    this.api.forgetPassword(this.Form.value).subscribe(forgetPasswordObserver);
  }

}



