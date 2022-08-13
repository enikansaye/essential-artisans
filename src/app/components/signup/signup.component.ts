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
  state2: any;
  city2: any;


  countries: any;
  submitted = false;
  selectedCountry: any = {
    id: 0,
    name: '',
    cities: '',
  };
  city: any;
  errorMessage = '';
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
    this.getState()
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
        console.log();
        return this.errorMessage = err.error
        // this.alertService.danger('signup failed');
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

  getState(){
    this.api.getLocation().subscribe((data:any)=>{
      this.state2= data
      console.log( this.state2);
      
    })
  }
  onChangeState(event:any){
    let userProfile =this.signupForm.controls['state'].value
    if(userProfile){
      this.api.getLocation2(userProfile).subscribe((data:any)=>{
        this. city2= data
        console.log( this.city2);
    })
  }
}
onChangeCity(event:any){
return this.signupForm.controls['city'].value
  
}
}

