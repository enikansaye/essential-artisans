import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  password?:string;
  hide = true;
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
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: [
        '',
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ],
      password: ['', Validators.required, Validators.minLength(4)],
      location: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  signup() {
    console.log(this.signupForm.value);
    this.api.signupUser(this.signupForm.value).subscribe((res) => {
      alert(res.message);
      console.log(res);
      this.signupForm.reset();
      this.router.navigate(['/signin']);
    });
  }

  // sign(data: any) {
  //   console.log(data);

  //   this.api.signupUser(data).subscribe((res) => {
  //     alert(res.message);
  //     console.log(res);
  //     this.signupForm.reset();
  //     this.router.navigate(['/signin']);
  //   });
  // }
}
