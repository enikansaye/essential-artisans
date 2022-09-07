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
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  hide = true;
  signupForm!: FormGroup;
  password?: string;
  
  statelga: any;
  state2: any;
  city2: any;
  errorMessage = '';
  // form :any

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    private authApi: AuthService
  ) {}
  submitted = false;
  ngOnInit(): void {
    
    this.getState()

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      // location: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }
  get signupFormControl() {
    return this.signupForm.controls;
  }

  onSubmit(data:any) {
    this.submitted = false;
    this.alertService.info('Working on creating new account');

    const registerObserver = {
      next: (res: any) => {
        this.router.navigate(['/checkemail']);
      },
      error: (err: any) => {
        console.log(err);
        console.log(data);
        return this.errorMessage = err.error
        
        // this.alertService.danger('signup failed');
      },
    };

    this.authApi.registerUser(this.signupForm.value).subscribe(registerObserver);
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
