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
import { of } from 'rxjs';
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



  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService
  ) {}
  submitted = false;
  ngOnInit(): void {

    // this.showAll();
    this.showAll();
    // this.onSelect(this.selectedCountry.id)


    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required,Validators.email],
      PhoneNumber: ['', Validators.required],
      password: ['', Validators.required],

      // location: ['', Validators.required],

      address: ['', Validators.required],
      city: ['', Validators.required],
      State: ['', Validators.required],
    });

    // this.api.getCountries().subscribe((data) => (this.countries = data));
  }

  get signupFormControl() {
    return this.signupForm.controls;
  }


  onSubmit() {
    this.submitted = false;
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


  countries: any;
  states: any;
  selectedCountry: any = {
    id: 0,
    name: '',
    cities: '',
  };

  showAll() {
    this.api.getAll().subscribe((data: any, i: any) => {
      const result = Object.entries(data);

      this.countries = data;
    });
  }

  onSelect(data: any) {
    let result = Object.entries(this.countries);
    console.log(data.value);

    const statesList = Object.values(result[data.value])[1];

    console.log((statesList as any)['cities']);
    this.states = (statesList as any)['cities'];

    console.log(this.states);
  }

  onSelectCities(data: any) {
    let result = Object.entries(this.countries);
    console.log(data.value);

    const statesList = Object.values(result[data.value])[1];

    console.log((statesList as any)['cities']);
    this.states = (statesList as any)['cities'];

    console.log(this.states);
  }

}
