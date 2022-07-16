import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { userProfileModel } from './userprofile.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  expression = 'match1';
  userProfileModelObj: userProfileModel = new userProfileModel();

  userData: any;
  loggedinUser: any;
  userResponse: any;
  formValue!: FormGroup;

  showAddEmployee!: boolean;

  showUpdate!: boolean;
  model: any = {};
  isComplete: boolean = false;
  profileimageUrl = 'assets/images/mayor.jpg';

  selectedFile: null = null;
  userprofileModelObj: userProfileModel = new userProfileModel();

  statelga: any;
  selectedStatelga: any = {
    id: 0,
    name: '',
  };

  updateOrder!: FormGroup;
  min: any = '';
  value: any;
  formSubmitted: boolean = false;
  public form!: FormGroup;
  rating3: number =0;

  constructor(
    private observer: BreakpointObserver,
    public api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      // email: [''],
      Address:[''],
      city:[''],
      state:[''],
      phoneNumber: [""],
      userId:[0]
    });
    this.getUser()
    this.showAll();

    this.updateOrder = this.formBuilder.group({
      name: [''],
      propertyAddress: [''],
      inspectionDate: [''],
      inspectionTime: [''],
      mobilenumber: [''],
      AltNumber: [''],
      issue: [''],
    });
    this.pastDateTime();
    // this.getUserserInfo();

    this.rating3 = 0;
    this.form = this.formBuilder.group({
   
      rating: ['', Validators.required],
      comment:['']
    })
  }

  submitRating(){
    

   
      // this.alertService.info('Working on creating new account');
  
      const registerObserver = {
        
        next: (res: any) => {
          this.userProfileModelObj.artisanId = res.id;
          console.log(this.userProfileModelObj.artisanId);
          // this.router.navigate(['/checkemail']);
          console.log(res);
          
        },
        error: (err: any) => {
          console.log(err);
          console.log(this.form.value);
          
          // this.alertService.danger('signup failed');
        },
      };
  
      this.api.postRating(this.form.value,).subscribe(registerObserver);
  
  }
  //  date and time selection
  pastDateTime() {
    var tdate: any = new Date();
    var date: any = tdate.getDate();
    if (date < 10) {
      date = '0 + date';
    }
    var month: any = tdate.getMonth();
    if (month < 10) {
      date = '0 + month';
    }

    var year: any = tdate.getFullYear();

    var hours: any = tdate.getHours();
  }
  onChange(value: any) {
    var today: any = new Date();
    var selectDate = new Date(value);
    if (today > selectDate) {
      alert("you can't select past date");
      this.value = '';
    }
  }

  // selecting location section
  showAll() {
    this.api.getAllStateData().subscribe((data: any) => {
      this.statelga = data;
      console.log(this.statelga);
    });
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
  onEditOrder(row: any) {
    this.showAddEmployee = false;
    this.showUpdate = true;

    this.userProfileModelObj.id = row.id;

    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['propertyAddress'].setValue(row.propertyAddress);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobilenumber'].setValue(row.mobilenumber);
    this.formValue.controls['AltNumber'].setValue(row.AltNumber);
    this.formValue.controls['inspectionDate'].setValue(row.inspectionDate);
    this.formValue.controls['issue'].setValue(row.issue);

 
  }

  // getUserserInfo() {
  //   this.userResponse = localStorage.getItem('token');
  //   this.userData = JSON.parse(this.userResponse).data;

  //   return this.userData;
  // }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.api.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  // on click to update userprofile
  onEdit() {
    this.formValue.controls['userId'].setValue(
      this.api.loggedinUser.id
    );
    this.formValue.controls['firstName'].setValue(
      this.api.loggedinUser.firstName
    );
    this.formValue.controls['lastName'].setValue(
      this.api.loggedinUser.lastName
    );
    this.formValue.controls['Address'].setValue(
      this.api.loggedinUser.Address
    );
    this.formValue.controls['city'].setValue(
      this.api.loggedinUser.city
    );
    this.formValue.controls['state'].setValue(
      this.api.loggedinUser.state
    );
   
    this.formValue.controls['phoneNumber'].setValue(
      this.api.loggedinUser.phoneNumber
    );
   

    this.showAddEmployee = false;
    this.showUpdate = true;
  }

  updateUserDetails(row:any) {
    console.log(row);
    console.log(row.id);
    
    this.userprofileModelObj.userId = this.formValue.value.userId;
    this.userprofileModelObj.firstName = this.formValue.value.firstName;
    this.userprofileModelObj.lastName = this.formValue.value.lastName;
    this.userprofileModelObj.Address = this.formValue.value.Address;
    this.userprofileModelObj.city = this.formValue.value.city;
    this.userprofileModelObj.state = this.formValue.value.state;
    this.userprofileModelObj.phoneNumber = this.formValue.value.PhoneNumber;





    this.api.userUpdate(this.formValue.value).subscribe((res: any) => {
      console.log(res);
      this.toastr.success('Profile updated')
      //   alert('employee updated sucessfully');

      //   // let ref = document.getElementById('cancel'); //this is to close the modal form automatically
      //   // ref?.click();

        // this.getUserserInfo() //this is to refresh and get the resent data
    });
  }

  clickEdit() {
    // this.formValue.reset();
    this.showAddEmployee = false;
    this.showUpdate = false;
  }
  onFileChange(e: any) {
    // this.model.file = e.target.files[0];
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (data: any) => {
        this.profileimageUrl = data.target.result;
        localStorage.setItem('url', data);
      };
    }
  }
  onFileSelected(e: any) {
    this.selectedFile = e.target.files[0];
    // this.selectedFile = File.item(0);
  }

  onSubmit() {
    // this.alertService.info("Updating Account");
    // this.progressBar.startLoading();
    const updateEmployerObserver = {
      next: (x: any) => {
      
        console.log('Account Updated');
        this.router.navigate(['/']);
       
      },
      error: (err: any) => {
        
        console.log(err);
        
      },
    };
    this.api.userUpdate(this.formValue).subscribe(updateEmployerObserver);
  }
 
  deleteOrder() {
    this.api.deleteUser().subscribe((res) => {
      alert('employee deleted');
      console.log('deleted');
      console.log(res);

      // this.getAllEmployee(); //this is to automatically refresh the page
    });
  }
  toggleEditMode(): void {
    this.isComplete = !this.isComplete;
  }

  updateServiceOrder(){
    this.formSubmitted = true;
    if(!this.updateOrder .valid){
      return;
    }
    this.api.updateService(this.updateOrder.value, this.updateOrder.value.id).subscribe({
      next: (data: any) => {
   
          // alertify.success('Profile successsfully updated.'); 
          this.updateOrder.disable();
          this.isComplete = false;
        },
     error:  ( error:any )=> {
          // alertify.error('Profile update failed'); 
          console.log(error);
          
        }
      })
  }
  getUser(){
    this.api.getUserinfo( this.api.loggedinUser.id).subscribe(
      
      
      (res: any) => {
      console.log(res);
      
      this.userData = res;
      console.log(this.userData);
      
    });
  }
}
