import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  public contactForm !: FormGroup;

  categories =[
    {},
     {id:1, name:'developer'},
     {id:2, name:'art'},
     {id:3, name:'comedy'},
     {id:4, name:'doctor'}
    ]

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
sendMessage(){
  
}

}


 

  

 
