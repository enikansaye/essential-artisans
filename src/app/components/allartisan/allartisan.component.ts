import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-allartisan',
  templateUrl: './allartisan.component.html',
  styleUrls: ['./allartisan.component.css']
})
export class AllartisanComponent implements OnInit {
statelga : any;
selectedStatelga: any = {
  id: 0, name:''
}

  formValue !: FormGroup;
   min :any = ""
  value: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {

this.showAll();

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
// date and time selection
  pastDateTime(){
var tdate:any = new Date();
var date:any = tdate.getDate();
if(date < 10){
  date = "0 + date"
}
var month :any = tdate.getMonth();
if(month < 10){
  date = "0 + month"
}

var year :any = tdate.getFullYear();

var hours :any = tdate.getHours();

  }
onChange(value:any){
var today:any = new Date();
var selectDate = new Date(value);
if(today > selectDate){
  alert("you can't select past date")
  this.value ="" 
}

}


// selecting location section
showAll() {
  this.api.getAllStateData().subscribe(
    (data: any) => {
    this.statelga = data;
    console.log(this.statelga)
  });
}
sendDetails(){
alert("Request sent, Artisan will contact as soon as posible")
console.log('mess')
}

}
