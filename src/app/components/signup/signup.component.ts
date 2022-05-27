import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  hide = true;
  statelga: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  showAll() {
    this.api.getAllStateData().subscribe((data: any) => {
      this.statelga = data;
      console.log(this.statelga);
    });
  }
  onSubmit() {
    // let authFlow = this.api.signinUser(this.signupForm.value);

    // authFlow.subscribe({
    //   next: (data: UserModel) => {
    //     this.api.saveUserToLocalStorage(data);
    //     alert('login succefssul');
    //     // alertify.success('login successful');
    //     this.router.navigate(['/']);
    //   },
    //   error: (err) => {
    //     alert('login failed');
    //   },
    // });
  }
}
