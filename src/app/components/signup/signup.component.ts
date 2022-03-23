import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 public signupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  signup(){
  this.http.post<any>("http://localhost:3000/signupUser ", this.signupForm.value)
  .subscribe(res => {
    alert("signup successful");
    this.signupForm.reset();
    this.router.navigate(['/dashboard'])
  }, err =>{
    alert("sometging went wrong")
  })
 } 

}
