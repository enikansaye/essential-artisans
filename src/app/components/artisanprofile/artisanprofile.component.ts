import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ArtisansService } from 'src/app/service/artisans.service';
import { LoginService } from 'src/app/service/login.service';
import { SignalrService } from 'src/app/service/signalr.service';
// import { DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/shared/admin.service';
import { userProfileModel } from '../userprofile/userprofile.model';


class itemObject {
  itemNo:any;
  unitPrice:number=0;
  quantity:number=0;
  total:number=0;

}

declare let alertify: any;
@Component({
  selector: 'app-artisanprofile',
  templateUrl: './artisanprofile.component.html',
  styleUrls: ['./artisanprofile.component.css'],
})
export class ArtisanprofileComponent implements OnInit {

  
  rating3: number = 0;
  quotePage:number = 1;
  progress=0;
  message='';
  @Output() public onUploadFinished = new EventEmitter();
  

  
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  artisanProfileModelObj: userProfileModel = new userProfileModel();


  InvoiceObject={
    personName:"",
    invoiceDate:"",
    invoiceNo:"",
    totalAmount:0
  }
  
  
  
  itemObject=new itemObject()
  itemsArray:Array<itemObject>=[
    {
      itemNo:"",
      unitPrice:0,
      quantity:0,
      total:0
  
    }
  ]

  showIcon: boolean = false;
  icon: boolean = false;
  shortLink: string = '';
  uploadingPhoto: boolean = false;
  change: boolean = false;
  imageURL: any;
  // file: File = null;

  errors = {};
  // user: UserModel;
  userPhoto: any;
  isEditMode: boolean = false;
  // address: AddressModel;
  updateForm!: FormGroup;
  formSubmitted: boolean | undefined;
  formControls: any;
  loadingInfo: boolean | undefined;
  loadingError: boolean | undefined;

  expression = 'match1';

  service = 'completed';
  usersForm!: FormGroup;

  selectedFiles?: FileList;
  currentFile?: File;

  fileInfos?: Observable<any>;

  num1: any;
  num2: any;
  result: any;
  alltotal: any;

  // shortLink: string = "";
  loading: boolean = false; // Flag variable
  file?: File;
  hello: any;
  heeo: any;
  statelga: any;
  artisanData: any;
  orderData: any;
  serviceCategory: any;
  state: any;
  city: any;
  fromDate1=''
  toDate1=''

  selectedCountry: any = {
    id: 0,
    name: '',
    cities: '',
  };
  state2: any;
  city2: any;
  invoiceData: any;
  filteredOrderData: any;
  value: any;


  constructor(
    private observer: BreakpointObserver,
    public api: ApiService,
    public adminApi: AdminService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private artisanurl: ArtisansService,
    private loginApi: LoginService,
    public signalRService: SignalrService,

    // private dataApi: DataService
  ) {}

  ngOnInit(): void {

    

    this.getState()
    this.getAllServiceCategory();

    

    this.showAll();
    this.usersForm = this.fb.group({
      users: this.fb.array([
        this.fb.group({
          gHService: [''],
          quantity: [''],
          startTime: [''],
          total: [''],
        }),
      ]),
    });

    


    

    this.updateForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      // email: [''],
      Address: [''],
      city: [''],
      state: [''],
      phoneNumber: [''],
      userId: [0],
      service: [''],
    });
    this.updateForm.disable();
    this.formControls = this.updateForm.controls;

    this.getArtisan();
    // this.getOrder();
    // this.getAllInvoices();
  }

  getArtisan() {
    this.api.getArtisaninfo().subscribe((res: any) => {

      this.artisanData = res;
    });
  }

  // sellection of location
  showAll() {
    this.api.getAll().subscribe((data: any, i: any) => {
      const result = Object.entries(data);

      this.state = data;
    });
  }

  

  onSelect(data: any) {
    let result = Object.entries(this.state);

    
this.city=data.value
  }

  onSelectCities(data: any) {


    let result = Object.entries(this.state);

    const statesList = Object.values(result[data.value])[1];

    this.city = (statesList as any)['cities'];

  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.formControls['firstName'].enable();
      this.formControls['lastName'].enable();
      this.formControls['phoneNumber'].enable();
      this.formControls['Address'].enable();
      this.formControls['service'].enable();
      this.formControls['state'].enable();
      this.formControls['city'].enable();
      this.formControls['userId'].enable();

      this.updateForm.controls['firstName'].setValue(
        this.artisanData.firstName
      );
      this.updateForm.controls['lastName'].setValue(
        this.artisanData.lastName
      );
    
      this.updateForm.controls['phoneNumber'].setValue(
        this.artisanData.phoneNumber
      );
      this.updateForm.controls['userId'].setValue(this.artisanData.id);
      
      this.updateForm.controls['Address'].setValue(this.artisanData.address);
      
      this.updateForm.controls['service'].setValue(this.artisanData.service);
      
      this.updateForm.controls['state'].setValue(this.artisanData.state);
      
      this.updateForm.controls['city'].setValue(this.artisanData.city);
      
    } else {
      this.updateForm.disable();
    }
  }

 

  get userFormGroups() {
    return this.usersForm.get('users') as FormArray;
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  

  
  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post(this.api.baseUrl + '/api/Artisan/upload-profile-image', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event:any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
        setTimeout(() => {
          this.progress =0;
          this.message= '';
        }, 1500);
        this.getArtisan()
      },
      error: (err: HttpErrorResponse) => {
        
      }
    });
  }

  
  updateUserDetails(row: any) {

    this.artisanProfileModelObj.userId = this.updateForm.value.userId;
    this.artisanProfileModelObj.firstName = this.updateForm.value.firstName;
    this.artisanProfileModelObj.lastName = this.updateForm.value.lastName;
    this.artisanProfileModelObj.Address = this.updateForm.value.Address;
    this.artisanProfileModelObj.city = this.updateForm.value.city;
    this.artisanProfileModelObj.state = this.updateForm.value.state;
    this.artisanProfileModelObj.phoneNumber = this.updateForm.value.PhoneNumber;
    this.artisanProfileModelObj.service = this.updateForm.value.service;

    this.artisanurl.artisanUpdate(this.updateForm.value).subscribe((res: any) => {
      this.toastr.success('Profile updated');
      this.isEditMode = this.isEditMode;
      this.updateForm.disable()
      
      this.toggleEditMode();
      this.getArtisan();
     
    });
  }

  

  getOrder() {
    this.artisanurl.getArtisanOrder().subscribe((data: any) => {
      this.orderData = data
    });
  }

  getAllServiceCategory(){
    this.adminApi.getServiceCategory().subscribe((data:any)=>{
      this.serviceCategory = data
      
    })
  }
  getAllInvoices(){
    this.artisanurl.artisanGetAllInvoices().subscribe((data:any)=>{
      this.invoiceData = data
      
    })
  }

  getState(){
    this.api.getLocation().subscribe((data:any)=>{
      this.state2= data
      
    })
  }
  onChangeState(event:any){
    let userProfile =this.updateForm.controls['state'].value
    if(userProfile){
      this.api.getLocation2(userProfile).subscribe((data:any)=>{
        this. city2= data
    })
  }
}
onChangeCity(event:any){
return this.updateForm.controls['city'].value
  
}
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
Search(event:any) {
  if (this.value == '') {
    
    this.getOrder();
  } else {
    this.filteredOrderData = this.filteredOrderData.filter((res: any) => {
      
      return res.name.toLocaleLowerCase()
        .match(this.value.toLocaleLowerCase());
    });
  }
// return this.hope;
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
