import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
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
  serviceData:any;
  state: any;


  countries: any;
  submitted = false;
  selectedCountry: any = {
    id: 0,
    name: '',
    cities: '',
  };
  city: any;
  // form :any

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    private adminApi: AdminService
  ) {}

  ngOnInit(): void {
    this.showAll();
    // this.getService()
   this.getAllServiceCategory()

    this.signupForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      password: [''],
     
      state: [''],
      city: [''],
      address: [''],
      service: [''],

    });
  }
  get signupFormControl() {
    return this.signupForm.controls;
  }

 // sellection of location
 showAll() {
  this.api.getAll().subscribe((data: any, i: any) => {
    const result = Object.entries(data);

    this.state = data;
  });
}

onSelect(data: any) {
  let result = Object.entries(this.state);
  console.log(data.value);

  const statesList = Object.values(result[data.value])[1];

  console.log((statesList as any)['cities']);
  this.city = (statesList as any)['cities'];

  console.log(this.city);
}

onSelectCities(data: any) {
  let result = Object.entries(this.state);
  console.log(data.value);

  const statesList = Object.values(result[data.value])[1];

  console.log((statesList as any)['cities']);
  this.city = (statesList as any)['cities'];

  console.log(this.city);
}
  onSubmit() {
    this.alertService.info('Working on creating new account');

    const registerObserver = {
      next: (res: any) => {
        console.log('Artican created');
        this.router.navigate(['/checkemail']);
      },
      error: (err: any) => {
        console.log(err);
        this.alertService.danger('signup failed');
      },
    };

    this.api.signupArtisan(this.signupForm.value).subscribe(registerObserver);
  }



  getAllServiceCategory() {
    this.adminApi.getServiceCategory().subscribe((res: any) => {
      this.serviceData = res;
      console.log( this.serviceData);
      
    });
  }

  
}
