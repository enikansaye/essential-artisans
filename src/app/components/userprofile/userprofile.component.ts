import { BreakpointObserver } from '@angular/cdk/layout';
import {
  HttpClient,
  HttpEventType,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { userProfileModel } from './userprofile.model';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';
import { DatePipe } from '@angular/common';
// import { MatTableDataSource } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SignalrService } from 'src/app/service/signalr.service';




// import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
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
  modalRef?: BsModalRef;


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
  page: number = 1; //pagination
  value: any;
  formSubmitted: boolean = false;
  public form!: FormGroup;
  rating3: number = 0;

  invoiceId:number=0;
  orderData: any;
  filteredOrderData: any;
  filteredQuoteData: any;
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
  dataSource = new MatTableDataSource();
  inspectionFee: any;
  orderById: any;
  rating4: number = 0;
  count: any;
  isFirstTimeCustomer: any;


  constructor(
    private observer: BreakpointObserver,
    public api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public login:LoginService,
    private modalService: BsModalService,//for ngx-bootstrap modal
    private toastr: ToastrService ,// private dataApi:DataService
    public signalRService: SignalrService,
  ) {
    
   
  }

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
      inspectionDateAndTime: "",
orderId: 0


    });
    this.feeForm.disable()
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
    // this.getOrder();
    // this.getPendingOrder();
    // this.getQoute();
    // this.getCompletedOrder();
     this.count = localStorage.getItem('notifyCount');


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

    this.rating3 = 0;
    this.form = this.formBuilder.group({
      rating: ['', Validators.required],
      
      comment: [''],
      artisanId: 0,
      orderId: 0,
    });
  }

  onClickRating(row: any) {
    this.userProfileModelObj.artisanId = row.artisanId;
    this.userProfileModelObj.orderId = row.id;
    this.form.controls['artisanId'].setValue(row.artisanId);
    this.form.controls['orderId'].setValue(row.id);
    
    // this.form.controls['rating'].setValue('')
  }

  submitRating(data: any) {
    const registerObserver = {
      next: (res: any) => {
        this.userProfileModelObj.artisanId = res.id;
        this.modalService.hide();
        this.getOrder();
        this.toastr.success('Thanks, for your review');


        // this.router.navigate(['/checkemail']);
      },
      error: (err: any) => {
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

 
  getOrder() {
    this.api.getUserOrder().subscribe((data: any) => {
      this.orderData = data;
      
      this.filteredOrderData = [...this.orderData]
      return this.filteredOrderData.reverse();

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
    this.formValue.controls['Address'].setValue(this.login.loggedinUser.address);
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
      this.formValue.disable()


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
        this.router.navigate(['/']);
      },
      error: (err: any) => {
      },
    };
    this.api.userUpdate(this.formValue).subscribe(updateEmployerObserver);
  }

  toggleEditMode(): void {
    this.isComplete = !this.isComplete;
  }

  onEditOrder(row: any) {
   

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

      this.userData = res;
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
      
    })
  }
  onChangeState(event:any){
    let userProfile =this.formValue.controls['state'].value
    if(userProfile){
      this.api.getLocation2(userProfile).subscribe((data:any)=>{
        this. city2= data
    })
  }
}
onChangeCity(event:any){
return this.formValue.controls['city'].value
  
}

  getPendingOrder() {
    return this.api.userGetPendingOrders().subscribe((res: any) => {
      this.pending = res;

    });
  }

  getQoute() {
    this.api.userGetInvoice().subscribe((data: any) => {
      this.getInvoice = data;

      this.filteredQuoteData = [...this.getInvoice]
      return this.filteredQuoteData.reverse();    });
  }
  
  userAprroveQuote(data: any) {
    data=this.getInvoiceId
    
    this.getInvoiceByIdForm.value.invoiceId =data.invoiceId
    this.api.customerApproveInvoice(this.getInvoiceByIdForm.value, data.invoiceId).subscribe((res: any) => {
      this.approveQuote = res;
      this.getQoute();

      window.location.href = this.approveQuote.link;

    });
    // this.router.navigate(['https://ravemodal-dev.herokuapp.com/v3/hosted/pay']);


  }
  userCancelQuote(data: any) {
    data=this.getInvoiceId
    this.getInvoiceByIdForm.value.invoiceId = data.invoiceId
    this.api.customerCancelInvoice(this.getInvoiceByIdForm.value, data.invoiceId).subscribe((res: any) => {
      this.cancelQuote = res;
      this.getQoute();
    });
  }

  // this get invoice by id
  onClickInvoce(data:any){
    this.invoiceId = data.invoiceId,
    this.getInvoiceId = data;
    
    
    this.api.getInvoiveById(this.getInvoiceByIdForm.value ,data.invoiceId).subscribe((data: any) => {
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
      
      this.invoiceUserDetails =this.getInvoiceId.customerInfo
    
     this.invoiceAction=this.getInvoiceId.action
     this.inspectionFee=this.getInvoiceId.inspectionFee
     this.isFirstTimeCustomer =this.getInvoiceId.isFirstTimeCustomer


    });

  }
 
  getCompletedOrder(){
    this.api.userCompletedOrder().subscribe((data:any)=>{
      
    })
  }
  getAprovedInvoice(){
    this.api.userGetApprovedInvoice().subscribe((data:any)=>{
      
    })
  }

  onClickViewOrder(data:any){
    this.deleteForm.value.invoiceId = data.id,
    
    
    this.api.getOrderById(this.deleteForm.value ,data.id).subscribe((data: any) => {
      this.orderById = data
      this.rating4 = data.artisanRating;
      

      
  
  })
  }
  Search(event:any) {
    if (this.value == '') {
      
      this.getOrder();
    } else {
      this.filteredOrderData = this.filteredOrderData.filter((res: any) => {
        
        return res.issue.toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
  // return this.hope;
  }
  quoteSearch(event:any) {
    if (this.value == '') {
      
      this.getOrder();
    } else {
      this.filteredOrderData = this.filteredOrderData.filter((res: any) => {
        
        return res.issue.toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
  // return this.hope;
  }

  




  applyFilter() {
    this.orderData.filter = ''+Math.random();
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  Operations!: any[] // set this however you did before.
  filteredOperations: any[] = [];


  originalLeaves :any =[]
  filterLeaves :any =[]
  fromDate1=''
  toDate1=''


  filterByDate(){
    let k = 0
    var ivTemp = this.orderData
   
    this.filteredOrderData = [...this.orderData];

    if(this.filteredOrderData! == ''){
      ivTemp = this.filteredOrderData
    }
   

    const isInRange = (element: any) => { 
      
      const fDate = new Date(this.fromDate1);
      const tDate = new Date(this.toDate1);
      const elementFDate = new Date(element['date']);

      

      return (elementFDate > fDate && elementFDate < tDate);
    }
    const result = Object.values(ivTemp).filter(isInRange);
    return this.filteredOrderData =result
    
  }

  filterByDate2(){
    let k = 0
    var ivTemp = this.getInvoice
   
    this.filteredQuoteData = [...this.getInvoice];

    if(this.filteredQuoteData! == ''){
      ivTemp = this.filteredQuoteData
    }
    

    const isInRange = (element: any) => { 
      
      const fDate = new Date(this.fromDate1);
      const tDate = new Date(this.toDate1);
      const elementFDate = new Date(element['date']);

      

      return (elementFDate > fDate && elementFDate < tDate);
    }
    const result = Object.values(ivTemp).filter(isInRange);
    return this.filteredQuoteData =result
    
  }
  search(){
    if (this.value == '') {
      
      this.getOrder();
    } else {
      this.filteredOrderData = this.filteredOrderData.filter((res: any) => {
        
        return res.issue.toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
  }

  hidden:boolean = false;

imageSource(){
    this.hidden = !this.hidden;
}

hidden2:boolean = false;

changeFee(){
    this.hidden2 = !this.hidden2;
}
changeInspectionDate(row:any){
row = this.orderById

this.feeForm.value.orderId = row.id


  this.api
    .updateInspectionDate(this.feeForm.value)
    .subscribe((res: any) => {
            this.toastr.success('Inspection Fee Sucessfully Updated!!');
            this.feeForm.reset()
            this.hidden = !this.hidden

      
    });

    this.toastr.warning('Something Went wrong!!');
  }

  onclickNotification(data:any){
    
    let i = 0
    let input ={
      
        notificationId :data
      
    }
    this.api.readNotification(input).subscribe((res:any) =>{
      this.toastr.success('You read this message')
  
  this.signalRService.getNotification()
      // this.signalRService.notification
      
    })
    
  }
}
