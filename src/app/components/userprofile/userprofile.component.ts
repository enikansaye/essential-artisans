import { BreakpointObserver } from '@angular/cdk/layout';
import {
  HttpClient,
  HttpEventType,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { userProfileModel } from './userprofile.model';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';
// import { DataService } from 'src/app/service/data.service';

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
  getInvoiceByIdForm!: FormGroup;
  min: any = '';
  p: number = 1; //pagination
  value: any;
  formSubmitted: boolean = false;
  public form!: FormGroup;
  rating3: number = 0;

  invoiceId:number=0;
  orderData: any;
  pending: any;
  getInvoice: any;
  cancelQuote: any;
  getInvoiceId:any; 
  artisanName: any;
  artisanEmail: any;
  artisanProfession: any;
  artisanPhoneNumber: any;
  userName: any;
  userEmail: any;
  userPhoneNumber: any;
  accountName: any;
  accountNumber: any;
  bankName: any;
  serviceItemsDetails: any;
  invoiceUserDetails: any;
  approveQuote: any;
  serviceItemsDescription: any;
  allTotal: any;
  invoiceAction: any;
  artisanCharge: any;
  state2: any;
  city2: any;
  jobDescription: any;

  constructor(
    private observer: BreakpointObserver,
    public api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private login:LoginService,
    private toastr: ToastrService // private dataApi:DataService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      // email: [''],
      Address: [''],
      city: [''],
      state: [''],
      phoneNumber: [''],
      userId: [0],
    });
    this.formValue.disable();

    this.deleteForm = this.formBuilder.group({
      orderId: 0,
    });

    this.getInvoiceByIdForm = this.formBuilder.group({
      invoiceId: 0,
      // userId: 0,
      

    });
    this.getUser();
    // this.showAll()
    this.getState();
    this.getOrder();
    this.getPendingOrder();
    this.getQoute();
    this.getCompletedOrder();

    this.updateOrder = this.formBuilder.group({
      name: [''],
      artisanId: 0,
      propertyAddress: [''],
      inspectionDate: ['2022-06-30T10:58:37.452Z'],
      inspectionTime: ['2022-06-30T10:58:37.452Z'],
      mobilenumber: [''],
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
      orderId: 0,
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
  // showAll() {
  //   this.api.getAll().subscribe((data: any, i: any) => {
  //     const result = Object.entries(data);

  //     this.state = data;
  //   });
  // }

  // onSelect(data: any) {
  //   let result = Object.entries(this.state);
  //   console.log(data.value);

  //   const statesList = Object.values(result[data.value])[1];

  //   console.log((statesList as any)['cities']);
  //   this.city = (statesList as any)['cities'];

  //   console.log(this.city);
  // }

  // onSelectCities(data: any) {
  //   let result = Object.entries(this.state);
  //   console.log(data.value);

  //   const statesList = Object.values(result[data.value])[1];

  //   console.log((statesList as any)['cities']);
  //   this.city = (statesList as any)['cities'];

  //   console.log(this.city);
  // }
  getOrder() {
    this.api.getUserOrder().subscribe((data: any) => {
      this.orderData = data;
      console.log(this.orderData);
      return this.orderData.reverse()
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

  deleteOrder(row: any) {
    let body = {
      orderid: row.id,
    };
    console.log(row.id);

    this.api.deletes(body).subscribe((res) => {
      this.toastr.success('Order deleted');
      this.getOrder();
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  
  // on click to update userprofile
  onEdit() {
    this.showUpdate = !this.showUpdate;

    if (this.showUpdate) {
      this.formValue.enable();

    this.formValue.controls['userId'].setValue(this.login.loggedinUser.id);
    this.formValue.controls['firstName'].setValue(
      this.login.loggedinUser.firstName
    );
    this.formValue.controls['lastName'].setValue(
      this.login.loggedinUser.lastName
    );
    this.formValue.controls['Address'].setValue(this.login.loggedinUser.Address);
    this.formValue.controls['city'].setValue(this.login.loggedinUser.city);
    this.formValue.controls['state'].setValue(this.login.loggedinUser.state);

    this.formValue.controls['phoneNumber'].setValue(
      this.login.loggedinUser.phoneNumber
    );
    }else {
      this.formValue.disable();
    }
    // this.showAddEmployee = false;
    // this.showUpdate = true;
  }

  // updating user profile
  updateUserDetails(row: any) {
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
      this.toastr.success('Profile updated');
      this.showUpdate = !this.showUpdate;

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
    this.userprofileModelObj.issue = row.issue;
    this.userprofileModelObj.phoneNumber = row.PhoneNumber;
    this.userprofileModelObj.artisanId = row.artisanId;
    this.updateOrder.controls['artisanId'].setValue(row.artisanId);
    this.updateOrder.controls['orderId'].setValue(row.id);
    this.updateOrder.controls['name'].setValue(row.name);
    // this.updateOrder.controls['lastName'].setValue(row.lastName);
    this.updateOrder.controls['propertyAddress'].setValue(row.propertyAddress);
    // this.updateOrder.controls['city'].setValue(row.city);
    // this.updateOrder.controls['state'].setValue(row.state);
    this.updateOrder.controls['phoneNumber'].setValue(row.phoneNumber);
    this.updateOrder.controls['issue'].setValue(row.issue);
    this.updateOrder.controls['issue'].setValue(row.inspectionDate);
  }

  getUser() {
    this.api.getUserinfo().subscribe((res: any) => {
      console.log(res);

      this.userData = res;
      console.log(this.userData);
    });
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  getState(){
    this.api.getLocation().subscribe((data:any)=>{
      this.state2= data
      console.log( this.state2);
      
    })
  }
  onChangeState(event:any){
    let userProfile =this.updateOrder.controls['state'].value
    if(userProfile){
      this.api.getLocation2(userProfile).subscribe((data:any)=>{
        this. city2= data
        console.log( this.city2);
    })
  }
}
onChangeCity(event:any){
return this.updateOrder.controls['city'].value
  
}

  getPendingOrder() {
    return this.api.userGetPendingOrders().subscribe((res: any) => {
      console.log(res);
      this.pending = res;

      console.log(this.pending);
    });
  }

  getQoute() {
    this.api.userGetInvoice().subscribe((data: any) => {
      this.getInvoice = data;
      console.log(data);

      console.log(this.getInvoice);
    });
  }
  
  userAprroveQuote(data: any) {
    console.log(this.getInvoiceId.invoiceId);
    data=this.getInvoiceId
    console.log(data.invoiceId);
    
    this.getInvoiceByIdForm.value.invoiceId =data.invoiceId
    this.api.customerApproveInvoice(this.getInvoiceByIdForm.value, data.invoiceId).subscribe((res: any) => {
      this.approveQuote = res;
      console.log(this.approveQuote);
    });
  }
  userCancelQuote(data: any) {
    console.log(this.getInvoiceId);
    data=this.getInvoiceId
    this.getInvoiceByIdForm.value.invoiceId = data.invoiceId
    this.api.customerCancelInvoice(this.getInvoiceByIdForm.value, data.invoiceId).subscribe((res: any) => {
      this.cancelQuote = res;
      console.log(this.cancelQuote);
    });
  }

  // this get invoice by id
  onClickInvoce(data:any){
    console.log(data);
    this.invoiceId = data.invoiceId,
    this.getInvoiceId = data;
    console.log(this.getInvoiceId);
    
    
    this.api.getInvoiveById(this.getInvoiceByIdForm.value ,data.invoiceId).subscribe((data: any) => {
      // this.getInvoiceByIdForm.controls['invoiceId'].setValue( data.invoiceId),
      this.getInvoiceId = data;
      this.artisanName =this.getInvoiceId.artisanInfo.name
      this.artisanEmail =this.getInvoiceId.artisanInfo.email
      this.artisanProfession =this.getInvoiceId.artisanInfo.profession
      this.artisanPhoneNumber =this.getInvoiceId.artisanInfo.phoneNumber

     //  user
      this.userName =this.getInvoiceId.customerInfo.name
      this.userEmail =this.getInvoiceId.customerInfo.email
      this.userPhoneNumber =this.getInvoiceId.customerInfo.phoneNumber

      this.accountName = this.getInvoiceId.accountName
      this.accountNumber = this.getInvoiceId.accountNumber
      this.bankName = this.getInvoiceId.bankName
      this.jobDescription = this.getInvoiceId.jobDescription

this.allTotal = this.getInvoiceId.invoiceTotal
this.artisanCharge = this.getInvoiceId.artisanCharge
this.serviceItemsDescription = this.getInvoiceId.description
this.serviceItemsDetails = this.getInvoiceId.serviceItems
      console.log(this.serviceItemsDetails);
      
      this.invoiceUserDetails =this.getInvoiceId.customerInfo
     console.log(data);
     console.log(this.getInvoiceId.action );
     this.invoiceAction=this.getInvoiceId.action

    });

  }
  getCompletedOrder(){
    this.api.userCompletedOrder().subscribe((data:any)=>{
      console.log('this is rest for completed order from user', data);
      
    })
  }
  getAprovedInvoice(){
    this.api.userGetApprovedInvoice().subscribe((data:any)=>{
      console.log('this is response form approved invoice', data);
      
    })
  }
}
