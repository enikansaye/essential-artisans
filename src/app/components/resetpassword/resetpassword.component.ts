import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetForm!: FormGroup;

  model: any = {};
 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private api:ApiService, 
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
     password: ['', Validators.required, ],
      confirmPassword: ['', Validators.required],
    });

    this.model.token = this.route.snapshot.queryParamMap.get('token');
    this.model.userid = this.route.snapshot.queryParamMap.get('userid');
  }

  onSubmit() {
    this.alertService.info('Working on changing password');
   
    this.api.resetPassword(this.model).subscribe(() => {
      
      
      this.alertService.success('Password Changed');
      
    }, (error : any) => {
   
      this.alertService.danger('Unable to change password');
     
    })
  }

}
