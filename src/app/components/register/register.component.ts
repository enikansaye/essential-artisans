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

  ngOnInit(): void {

    // this.showAll();
    this.showAll2();
    // this.onSelect(this.selectedCountry.id)


    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      cities: ['', Validators.required],
    });

    // this.api.getCountries().subscribe((data) => (this.countries = data));
  }

  // show all location within lagos
  // showAll() {
  //   this.api.getAllStateData().subscribe((data: any) => {
  //     this.statelga = data;
  //     console.log(this.statelga);
  //   });
  // }


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


  countries: any;
  states: any;
  selectedCountry: any = {
    id: 0,
    name: '',
    cities: '',
  };

  showAll2() {
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
