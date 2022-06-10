import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/service/api.service';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
 

  signupForm!: FormGroup;
  password?: string;
  hide = true;
  statelga: any;
  // form :any

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.showAll();

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: [
        '',
        Validators.required,
      
      ],
      password: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  showAll() {
    this.api.getAllStateData().subscribe(
      (data: any) => {
      this.statelga = data;
      console.log(this.statelga)
    });
  }
  onSubmit() {
    this.alertService.info('Working on creating new account');

    const registerObserver = {
      next: (res: any) => {
    
      console.log('Artican created')
      this.router.navigate(['/checkemail']);
      },
      error: (err: any) => {
        console.log(err);
        this.alertService.danger('signup failed');
      },
    };

    this.api.signupArtisan(this.signupForm.value).subscribe(registerObserver);
  }
}
