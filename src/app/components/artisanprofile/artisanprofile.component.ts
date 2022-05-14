import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';



@Component({
  selector: 'app-artisanprofile',
  templateUrl: './artisanprofile.component.html',
  styleUrls: ['./artisanprofile.component.css']
})
export class ArtisanprofileComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav !: MatSidenav;

  expression = 'match1';

  service = 'completed';
  usersForm !: FormGroup;


  num1: any;
  num2: any;
  result : any;
  alltotal : any

  constructor(private observer : BreakpointObserver, private fb: FormBuilder, private http: HttpClient, private router: Router) { }



  ngOnInit() :void {
    this.usersForm = this.fb.group({
      users: this.fb.array([
        this.fb.group({
          gHService: [''],
          quantity: [''],
          startTime: [''],
          total: [''],
              
        })
      ])
    })
  }

  

  grandtotal(){
this.alltotal = parseInt(this.result) + parseInt(this.result)
  }
  celltotal(){
this.result = parseInt(this.num1) * parseInt(this.num2)
  }
onEnter(){
  this.result = parseInt(this.num1) * parseInt(this.num2)
  this.alltotal = (this.result ) + parseInt(this.result)
}



  get userFormGroups () {
    return this.usersForm.get('users') as FormArray
  }

  removeFormControl(i: number) {
    let usersArray = this.usersForm.get('users') as FormArray;
    usersArray.removeAt(i);
  }

  addFormControl() {
    let usersArray = this.usersForm.get('users') as FormArray;
    let arraylen = usersArray.length;

    let newUsergroup: FormGroup = this.fb.group({
          gHService: [''],
          quantity: [''],
          startTime: [''],
         total: [''],
          
    })

    usersArray.insert(arraylen, newUsergroup);
  }
  onSubmit(){
    console.log(this.usersForm.value);
  }


  // ngOnInit(): void {
  //   this.addMore = this.fb.group({
  //     itemRows: this.fb.array([this.initialRow()])
  //   })
  //   }

//     initialRow(){
//       return this.fb.group({
//         task1: [''],

//       })
//   }
//   addMoreRows(){
//     this.formArr.push(this.initialRow())
//   }
//   deleteRow(index:number){
//     this.formArr.removeAt(index)
//   }

//   get formArr(){
    
// return this.addMore.get('itemRows') as FormArray;
//   }

//   get f(){
//     return this.addMore.controls;
//   }

ngAfterViewInit(){
  this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
    if(res.matches){
      this.sidenav.mode = 'over';
      this.sidenav.close();
    }else{
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  })
}
}
