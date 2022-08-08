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

  state: any;
  city: any;
  selectedCountry: any = {
    id: 0,
    name: '',
    cities: '',
  };

  updateOrder!: FormGroup;
  deleteForm!: FormGroup;
  min: any = '';
  value: any;
  formSubmitted: boolean = false;
  public form!: FormGroup;
  rating3: number = 0;
  orderData: any;

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
<<<<<<< HEAD
      email: [''],
      PhoneNumber: [''],
     address: [''],
     state: [''],
     city: [''],
    
     
  
     
=======
      // email: [''],
      Address: [''],
      city: [''],
      state: [''],
      phoneNumber: [''],
      userId: [0],
    });
    this.deleteForm = this.formBuilder.group({
      orderId: 0,
>>>>>>> dev
    });
    this.getUser();
    this.showAll();
    this.getOrder();

    this.updateOrder = this.formBuilder.group({
      name: [''],
      artisanId: 0,
      propertyAddress: [''],
<<<<<<< HEAD
      inspectionDate: [''],
      inspectionTime: [''],
  PhoneNumber: [''],
=======
      inspectionDate: ['2022-06-30T10:58:37.452Z'],
      inspectionTime: ['2022-06-30T10:58:37.452Z'],
      mobilenumber: [''],
>>>>>>> dev
      AltNumber: [''],
      issue: [''],
      userId: 0,
      orderId: 0,
    });

    this.deleteForm = this.formBuilder.group({
      orderId: 0,
    });

    this.pastDateTime();
    
    this.form = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: [''],
      artisanId: 0,
      orderId: 0
    });
  }

  onClickRating(row: any) {
    console.log(row);
    this.userProfileModelObj.artisanId = row.artisanId;
    this.userProfileModelObj.orderId = row.id;
    this.form.controls['artisanId'].setValue(row.artisanId);
    this.form.controls['orderId'].setValue(row.id);
  }

  submitRating(data: any) {
    console.log(data);

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

        
      },
    };

    this.api.postRating(this.form.value).subscribe(registerObserver);
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
    this.api.getAll().subscribe((data: any, i: any) => {
      const result = Object.entries(data);

      this.state = data;
    });
  }

  onSelect(data: any) {
    let result = Object.entries(this.state);
    console.log(data.value);

    const statesList = Object.values(result[data.value])[1];

    console.log((statesList as any)['cities']);
    this.city = (statesList as any)['cities'];

    console.log(this.city);
  }

  onSelectCities(data: any) {
    let result = Object.entries(this.state);
    console.log(data.value);

    const statesList = Object.values(result[data.value])[1];

    console.log((statesList as any)['cities']);
    this.city = (statesList as any)['cities'];

    console.log(this.city);
  }
  getOrder() {
    this.api.getUserOrder().subscribe((data: any) => {
      this.orderData = data;
      console.log(this.orderData);
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

<<<<<<< HEAD
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['propertyAddress'].setValue(row.propertyAddress);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['AltNumber'].setValue(row.AltNumber);
    this.formValue.controls['inspectionDate'].setValue(row.inspectionDate);
    this.formValue.controls['issue'].setValue(row.issue);
    this.formValue.controls['address'].setValue(row.issue);
    this.formValue.controls['city'].setValue(row.issue);
=======
  deleteOrder(row: any) {
    let body = {
      orderid: row.id,
    };
    console.log(row.id);
>>>>>>> dev

    this.api.deletes(body).subscribe((res) => {
      this.toastr.success('Order deleted');
      this.getOrder();
    });
  }

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
    this.formValue.controls['userId'].setValue(this.api.loggedinUser.id);
    this.formValue.controls['firstName'].setValue(
      this.api.loggedinUser.firstName
    );
    this.formValue.controls['lastName'].setValue(
      this.api.loggedinUser.lastName
    );
<<<<<<< HEAD
    this.formValue.controls['email'].setValue(this.api.loggedinUser.email);
    // this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['PhoneNumber'].setValue(
=======
    this.formValue.controls['Address'].setValue(this.api.loggedinUser.Address);
    this.formValue.controls['city'].setValue(this.api.loggedinUser.city);
    this.formValue.controls['state'].setValue(this.api.loggedinUser.state);

    this.formValue.controls['phoneNumber'].setValue(
>>>>>>> dev
      this.api.loggedinUser.phoneNumber
    );

    this.showAddEmployee = false;
    this.showUpdate = true;
  }

  // updating user profile
  updateUserDetails(row: any) {
    console.log(row);
    console.log(row.id);

    this.userprofileModelObj.userId = this.formValue.value.userId;
    this.userprofileModelObj.firstName = this.formValue.value.firstName;
    this.userprofileModelObj.lastName = this.formValue.value.lastName;
<<<<<<< HEAD
    this.userprofileModelObj.email = this.formValue.value.email;
    this.userprofileModelObj.PhoneNumber = this.formValue.value.PhoneNumber;
    this.userprofileModelObj.address = this.formValue.value.address;
    this.userprofileModelObj.city = this.formValue.value.city;
    this.userprofileModelObj.state = this.formValue.value.state;
=======
    this.userprofileModelObj.Address = this.formValue.value.Address;
    this.userprofileModelObj.city = this.formValue.value.city;
    this.userprofileModelObj.state = this.formValue.value.state;
    this.userprofileModelObj.phoneNumber = this.formValue.value.PhoneNumber;
>>>>>>> dev

    this.api.userUpdate(this.formValue.value).subscribe((res: any) => {
      console.log(res);
      this.toastr.success('Profile updated');
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

  toggleEditMode(): void {
    this.isComplete = !this.isComplete;
  }

  onEditOrder(row: any) {
    console.log(row);
    console.log(row.artisanId);

    this.userprofileModelObj.userId = row.userId;
    this.userprofileModelObj.firstName = row.firstName;
    this.userprofileModelObj.lastName = row.lastName;
    this.userprofileModelObj.propertyAddress = row.propertyAddress;
    this.userprofileModelObj.city = row.city;
    this.userprofileModelObj.state = row.state;
    this.userprofileModelObj.phoneNumber = row.PhoneNumber;
    this.userprofileModelObj.artisanId = row.artisanId;
    this.updateOrder.controls['artisanId'].setValue(row.artisanId);
    this.updateOrder.controls['orderId'].setValue(row.id);
  }

  updateServiceOrder() {
    // console.log(row);
    // console.log(row.id);

    this.userprofileModelObj.userId = this.updateOrder.value.userId;
    this.userprofileModelObj.firstName = this.updateOrder.value.firstName;
    this.userprofileModelObj.lastName = this.updateOrder.value.lastName;
    this.userprofileModelObj.propertyAddress =
      this.updateOrder.value.propertyAddress;
    this.userprofileModelObj.city = this.updateOrder.value.city;
    this.userprofileModelObj.state = this.updateOrder.value.state;
    this.userprofileModelObj.phoneNumber = this.updateOrder.value.PhoneNumber;
    this.userprofileModelObj.artisanId = this.updateOrder.value.artisanId;

    this.api.updateService(this.updateOrder.value).subscribe((res: any) => {
      console.log(res);
      this.toastr.success('Profile updated');

      //   // let ref = document.getElementById('cancel'); //this is to close the modal form automatically
      //   // ref?.click();

      // this.getUserserInfo() //this is to refresh and get the resent data
    });
  }
  getUser() {
    this.api.getUserinfo(this.api.loggedinUser.id).subscribe((res: any) => {
      console.log(res);

      this.userData = res;
      console.log(this.userData);
    });
  }
}
