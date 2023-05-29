import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { findIndex } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
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
  serviceData: any;
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
  bankData: any;
  bankName: any;
  // form :any

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private toastr: ToastrService,
    private adminApi: AdminService,
    private authApi: AuthService
  ) {}

  ngOnInit(): void {
    // this.getState()
    // this.showAll();
    // this.getBanks()

    // this.getService()
    //  this.getAllServiceCategory()

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],

      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      service: ['', Validators.required],
      categoryId: ['', Validators.required],
      bankCode: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      accountName: ['', Validators.required],
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

    const statesList = Object.values(result[data.value])[1];

    this.city = (statesList as any)['cities'];
  }

  onSelectCities(data: any) {
    let result = Object.entries(this.state);

    const statesList = Object.values(result[data.value])[1];

    this.city = (statesList as any)['cities'];
  }
  onSubmit(res: any) {
    this.toastr.info('Working on creating new account');
    // let index = this.bankData.findIndex((x: any) => {});
    // let index = this.bankData.findIndex((x: any) => {});
    this.signupForm.value.bankName = this.bankName;


    // this.signupForm.value.bankName = this.bankData[index].name

    const registerObserver = {
      next: (res: any) => {
        this.router.navigate(['/checkemail']);
      },
      error: (err: any) => {
        if (err.error || err.error.message) {

          this.errorMessage = err.error;
        }
      },
    };

    this.authApi
      .signupArtisan(this.signupForm.value)
      .subscribe(registerObserver);
  }

  getBanks() {
    this.api.getAllBanks().subscribe((res: any) => {
      this.bankData = res;
    });
  }

  onBanks(data: any) {
    const hope =this.signupForm.value.bankCode
    let bankNewName = this.bankData.find((s:any) => s.code === hope);
    this.bankName = bankNewName.name

  }

  getAllServiceCategory() {
    this.adminApi.getServiceCategory().subscribe((res: any) => {
      this.serviceData = res;
    });
  }

  getState() {
    this.api.getLocation().subscribe((data: any) => {
      this.signupForm.controls['service'].value;

      this.state2 = data;
    });
  }
  onChangeBank(event: any) {
    let userProfile = this.signupForm.controls['bankName'].value;

    if (userProfile) {
      // this.api.getAllBanks(userProfile).subscribe((res: any) => {
      //     this.bankData = res;
      // })
    }
  }
  onChangeState(event: any) {
    let userProfile = this.signupForm.controls['state'].value;
    if (userProfile) {
      this.api.getLocation2(userProfile).subscribe((data: any) => {

        this.city2 = data;
      });
    }
  }
  onChangeCity(event: any) {
    return this.signupForm.controls['city'].value;
  }
  onChangeBank2(event: any) {
    return this.signupForm.controls['bankName'].value;
  }
}
