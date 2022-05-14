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
  statelga: any;
  // form :any

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // usernameFormControl = new FormControl('', [Validators.required, ]);
  // addressFormControl = new FormControl('', [Validators.required, ]);
  // locationFormControl = new FormControl('', [Validators.required,]);
  // numberFormControl = new FormControl('', [Validators.required,]);
  // passwordFormControl = new FormControl('', [Validators.required,]);

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
      username: ['', Validators.required],
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
  signup() {
    // console.log(this.signupForm.value);
    this.api.signupUser(this.signupForm.value).subscribe((res) => {
      alert(res.status);
      console.log(res);
      this.signupForm.reset();
      this.router.navigate(['/signin']);
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
        console.log('User created');
        // this.alertService.success('Account Created');
          // alert(res.status);
      
      this.router.navigate(['/checkemail']);
      },
      error: (err: any) => {
        console.log(err);
        this.alertService.danger(err.error.errors[0].description);
      },
    };

    this.api.signupUser(this.signupForm.value).subscribe(registerObserver);
  }
}
