import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { userProfileModel } from './userprofile.model';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  expression = 'match1';

  userData: any;
  loggedinUser: any;
  userResponse: any;
  formValue !: FormGroup;

  showAddEmployee !: boolean;

  showUpdate !: boolean
  model: any = {};
  profileimageUrl ="assets/images/mayor.jpg"

  userprofileModelObj: userProfileModel = new userProfileModel()

  constructor(private observer: BreakpointObserver, public api: ApiService,private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
   
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobilenumber: [''],
      
   
    });

    this.getUserserInfo();
    
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  
  getUserserInfo(){
    this.userResponse = localStorage.getItem('token')
    this.userData = JSON.parse(this.userResponse).data
   
  
  
   return this.userData
  }

// on click to update userprofile
  onEdit() {
 

    this.formValue.controls['firstName'].setValue(this.api.loggedinUser.userName);
    this.formValue.controls['lastName'].setValue(this.api.loggedinUser.lastName);
    this.formValue.controls['email'].setValue(this.api.loggedinUser.email);
    // this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobilenumber'].setValue(this.api.loggedinUser.mobilenumber);

    this.showAddEmployee = false;
this.showUpdate = true;
  
  }

  updateEmployeeDetails() {
    this.userprofileModelObj.firstname = this.formValue.value.firstname;
    this.userprofileModelObj.lastname = this.formValue.value.lastname;
    this.userprofileModelObj.email = this.formValue.value.email;
    this.userprofileModelObj.mobilenumber = this.formValue.value.mobilenumber;
 

    this.api
      .userImage(this.userprofileModelObj,)
      .subscribe((res: any) => {
        console.log(res);
        alert('employee updated sucessfully');

        // let ref = document.getElementById('cancel'); //this is to close the modal form automatically
        // ref?.click();


        // this.getUserserInfo() //this is to refresh and get the resent data
      });
  }

  clickEdit(){
    // this.formValue.reset();
    this.showAddEmployee = false;
    this.showUpdate = false;
      }
      onFileChange(e: any) {
        // this.model.file = e.target.files[0];
        if(e.target.files){
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = (data:any) =>{
            this.profileimageUrl =data.target.result
            localStorage.setItem("url", data);
          }
        }
      }
    
      onSubmit() {
        // this.alertService.info("Updating Account");
        // this.progressBar.startLoading();
        const updateEmployerObserver = {
          next: (x : any)=> {
            // this.progressBar.setSuccess();
            console.log("Account Updated");
            this.router.navigate(['/'])
            // this.alertService.success("Account Updated");
            // this.progressBar.completeLoading();
          },
          error: (err:any) => {
            // this.progressBar.setError();
            console.log(err);
            // this.alertService.danger("Unable to Update Account");
            // this.progressBar.completeLoading();
          }
        };
        this.api
          .updateUser(this.model)
          .subscribe(updateEmployerObserver);
      }
  // getUserDetails(id:any) {

  //   this.api.getUser(id).subscribe((res: any) => {
  //     this.data = res;
  //   });
  // }
  // getAllEmployee() {
  //   this.api.getEmployee().subscribe((res: any) => {
  //     this.employeeData = res;
  //   });
  // }

  // getAllEmployee(row:any) {
  //   this.api.getUser(row.id).subscribe((res: any) => {
  //     this.userData = res;
  //   });
  // }
  // deleteEmployeeData(row: any) {
  //   this.api.deleteEmployee(row.id).subscribe((res) => {
  //     alert('employee deleted');
  //     this.getAllEmployee(); //this is to automatically refresh the page
  //   });
  // }
}
