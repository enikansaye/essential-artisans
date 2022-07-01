import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  password?: string;
  hide = true;

  locationData: any;
  // form :any

  countries: any=[];
  selectedCountry:any={
    id:0,
    name:''
  }
  // states: any;
  cities:any=[];

  state:any=[];
  city:any=[]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
   
      
    this.showAll();
    this.onSelect(this.selectedCountry.id)

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.api.getCountries().subscribe((data) => (this.countries = data));
  }

 

  showAll(){
     this.api.getAllStateData().subscribe((res: any) => {
      console.log(res);
      this.countries =res.name
      console.log(this.countries);
      
     
    });
   
  }

  onSelect(country_id:any){

    this.api.getAllStateData().subscribe((res: any) => {
      // console.log(res[('')].name);
    //  this.cities = res
      this.cities =res['cities'].filter(
        (res:any)=>res.country_id ==country_id.value
      )
      console.log(this.cities);
      
     
    });

    
  

  }

  onSubmit() {
    this.alertService.info('Working on creating new account');

    const registerObserver = {
      next: (res: any) => {
        this.router.navigate(['/checkemail']);
      },
      error: (err: any) => {
        console.log(err);
        this.alertService.danger('signup failed');
      },
    };

    this.api.registerUser(this.signupForm.value).subscribe(registerObserver);
  }
}
