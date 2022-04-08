import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partnerregister',
  templateUrl: './partnerregister.component.html',
  styleUrls: ['./partnerregister.component.css']
})
export class PartnerregisterComponent implements OnInit {

  signupForm !: FormGroup 
  hide = true;

  


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required,],
      password: ['', Validators.required],
      profession: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
     
    })
    
  };
  signup(){

  }

}