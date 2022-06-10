import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router : Router) { }

  ngOnInit(): void {

this.showAll();

    this.formValue = this.formBuilder.group({
      name: [''],
      propertyAddress: [''],
      inspectionDate: [''],
      inspectionTime: [''],
      mobilenumber: [''],
      AltNumber: [''],
      issue: [''],
  
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

createnewService(value: any) {
    this.api.createService(value.id).subscribe((res) => {
      console.log(res);
      
      alert('fill request form');
      // this.getAllUser(); //this is to automatically refresh the page
    });
  }

 onSubmi(){
  // this.alertService.info('Checking User Info');
  
    const loginObserver = {
      next:()=> {
     
        console.log('order Sent');
        this.router.navigate(['/']);
        // this.alertService.success('Logged In');
     
      },
      error: (err: any) => {
        // this.progressBar.setError();
        console.log(err);
        // this.alertService.danger('Unable to Login');
     
      }
    };
    this.api. uploadService(this.formValue.value).subscribe(loginObserver);
  }

  onSubmit(){
    this.api.createService(this.formValue.value)
    
    .subscribe(
    {
      next: (data: any) =>{
        alert('data sent')
        // localStorage.setItem('token', JSON.stringify(data));
        console.log('login succefssul')
             this.router.navigate(['/dashboard']);
      },
      error: (err)=>{
        alert('login failed')
        console.log(err);
        
      }
    }
    )
  }
  // getAllEmployee() {
  //     // this.api.getEmployee().subscribe((res: any) => {
  //     //   this.employeeData = res;
  //     // });
  //   }
}
