import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,   } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  signupForm !: FormGroup 
  hide = true;
  // form :any

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // usernameFormControl = new FormControl('', [Validators.required, ]);
  // addressFormControl = new FormControl('', [Validators.required, ]);
  // locationFormControl = new FormControl('', [Validators.required,]);
  // numberFormControl = new FormControl('', [Validators.required,]);
  // passwordFormControl = new FormControl('', [Validators.required,]);
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
   
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required,Validators.minLength(11),Validators.maxLength(11)],
      password: ['', Validators.required, Validators.minLength(4)],
      location: ['', Validators.required],
      address: ['', Validators.required],
     
    })
  }
  signup(){
// console.log(this.signupForm.getRawValue())
this.http.post("http://localhost:3000/signupUser", this.signupForm.getRawValue())
.subscribe((res)=>{
console.log(res)
this.router.navigate(['/signin'])
})
  }

}
