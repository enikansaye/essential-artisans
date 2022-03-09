import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  hide= true;
  // email =strings =""
resetpassword !: FormGroup;

  reset(){

  }
  constructor(private http: HttpClient, private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    this.resetpassword = this.formBuilder.group({
      email:['', Validators.required,Validators.email],
      password:['', Validators.required],
      password2:['', Validators.required]
    })
  }
  forgetpassword(){
    // this.
  }

}
