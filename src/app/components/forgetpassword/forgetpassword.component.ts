import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
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

  reset(){

  }
  constructor(    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      email:['', Validators.required],
    
    })
  }
  onSubmit(){
    this.alertService.info('Working on sending email');
    
    const forgetPasswordObserver = {
      next: (res:any) => {
       
        this.alertService.success('Check email to change password');
        console.log('Check email to change password');
   
        // this.router.navigate(['/dashboard']);
      },
      error: (err:any) => {
     
        console.log(err);
        this.alertService.danger('Unable to send email');
      }
    };
    this.api.forgetPassword(this.Form.value).subscribe(forgetPasswordObserver);
  }

}



