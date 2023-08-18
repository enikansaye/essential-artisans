import { BreakpointObserver } from '@angular/cdk/layout';
import {
  HttpClient,
  HttpEventType,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { userProfileModel } from './userprofile.model';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';
import { DatePipe } from '@angular/common';
// import { MatTableDataSource } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SignalrService } from 'src/app/service/signalr.service';

// import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  feeForm!: FormGroup;
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  expression = 'match1';
  userProfileModelObj: userProfileModel = new userProfileModel();
  bsModalRef?: BsModalRef;

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
  getInvoiceByIdForm!: FormGroup;
  min: any = '';
  p: number = 1; //pagination
  value: any;
  formSubmitted: boolean = false;
  public form!: FormGroup;
  rating3: number = 0;

  orderData: any;
  filteredOrderData: any;
  pending: any;
  
  
  state2: any;
  city2: any;
  jobDescription: any;
  dataSource = new MatTableDataSource();
  inspectionFee: any;
  orderById: any;
  rating4: number = 0;
  count: any;
 
  isEditMode!: boolean;
  formControls: any;
  submitted = false;

  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public login: LoginService,
    private modalService: BsModalService, //for ngx-bootstrap modal
    private toastr: ToastrService, // private dataApi:DataService
    public signalRService: SignalrService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      // email: [''],
      address: [''],
      city: [''],
      state: [''],
      phoneNumber: [''],
      userId: [0],
    });

    this.feeForm = this.formBuilder.group({
      inspectionFee: 0,
      inspectionDateAndTime: '',
      orderId: 0,
    });
    this.feeForm.disable();
    this.formValue.disable();
    this.formControls = this.formValue.controls;

    this.deleteForm = this.formBuilder.group({
      orderId: 0,
    });

   
    this.getUser();
    // this.showAll()
    this.getState();

    this.count = localStorage.getItem('notifyCount');

  

    this.deleteForm = this.formBuilder.group({
      orderId: 0,
    });

    this.pastDateTime();

    this.rating3 = 0;
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

  

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // updating user profile
  updateUserDetails(row: any) {
    this.userprofileModelObj.userId = this.formValue.value.userId;
    this.userprofileModelObj.firstName = this.formValue.value.firstName;
    this.userprofileModelObj.lastName = this.formValue.value.lastName;
    this.userprofileModelObj.Address = this.formValue.value.Address;
    this.userprofileModelObj.city = this.formValue.value.city;
    this.userprofileModelObj.state = this.formValue.value.state;
    this.userprofileModelObj.phoneNumber = this.formValue.value.PhoneNumber;

    this.api.userUpdate(this.formValue.value).subscribe((res: any) => {
      // this.toastr.success('Profile updated');
      this.toastr.success('Profile successfully updated!!!');
      this.getUser();
      this.formValue.disable();

      this.showUpdate = !this.showUpdate;
    });
  }

  clickEdit() {
    // this.formValue.reset();
    this.showAddEmployee = false;
    this.showUpdate = false;
  }

  onSubmit() {
    const updateEmployerObserver = {
      next: (x: any) => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {},
    };
    this.api.userUpdate(this.formValue).subscribe(updateEmployerObserver);
  }

  toggleEditMode(data: any): void {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.formControls['firstName'].enable();
      this.formControls['lastName'].enable();
      this.formControls['phoneNumber'].enable();
      this.formControls['address'].enable();
      this.formControls['state'].enable();
      this.formControls['city'].enable();
      this.formControls['userId'].enable();

      this.formValue.controls['firstName'].setValue(this.userData.firstName);
      this.formValue.controls['lastName'].setValue(this.userData.lastName);

      this.formValue.controls['phoneNumber'].setValue(
        this.userData.phoneNumber
      );
      this.formValue.controls['userId'].setValue(this.userData.id);

      this.formValue.controls['address'].setValue(this.userData.address);

      this.formValue.controls['state'].setValue(this.userData.state);

      this.formValue.controls['city'].setValue(this.userData.city);
    } else {
      this.formValue.disable();
    }
  }

 

  getUser() {
    this.api.getUserinfo().subscribe((res: any) => {
      this.userData = res;
    });
  }

  getState() {
    this.api.getLocation().subscribe((data: any) => {
      this.state2 = data;
    });
  }
  onChangeState(event: any) {
    let userProfile = this.formValue.controls['state'].value;
    if (userProfile) {
      this.api.getLocation2(userProfile).subscribe((data: any) => {
        this.city2 = data;
      });
    }
  }
  onChangeCity(event: any) {
    return this.formValue.controls['city'].value;
  }

  getPendingOrder() {
    return this.api.userGetPendingOrders().subscribe((res: any) => {
      this.pending = res;
    });
  }

  getCompletedOrder() {
    this.api.userCompletedOrder().subscribe((data: any) => {});
  }

  Operations!: any[]; // set this however you did before.
  filteredOperations: any[] = [];

  originalLeaves: any = [];
  filterLeaves: any = [];
}
