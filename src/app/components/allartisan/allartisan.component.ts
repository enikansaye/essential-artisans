import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-allartisan',
  templateUrl: './allartisan.component.html',
  styleUrls: ['./allartisan.component.css']
})
export class AllartisanComponent implements OnInit {

  formValue !: FormGroup;
   min :any = ""

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobilenumber: [''],
      salary: [''],
      handle: [''],
    });

   this.pastDateTime();
   
  }

  pastDateTime(){
var tday:any = new Date();
  }

}
