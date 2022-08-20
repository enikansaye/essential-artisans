import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
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
  selectedCountry: any = {
    id: 0,
    name: '',
    cities: '',
  };
  state2: any;
  city2: any;


  constructor(
    private observer: BreakpointObserver,
    public api: ApiService,
    public adminApi: AdminService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
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
    this.getOrder()
  }

  getArtisan() {
    this.api.getArtisaninfo().subscribe((res: any) => {
      console.log(res);

      this.artisanData = res;
      console.log(this.artisanData);
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
    console.log(data.value);

    // const statesList = Object.values(result[data.value])[1];

    // console.log((statesList as any)['cities']);
    // this.city = (statesList as any)['cities'];
this.city=data.value
    console.log(this.city);
  }

  onSelectCities(data: any) {

    // this.api.getLocation2(this.city).subscribe((data: any, i: any) => {
    //   const result = Object.entries(data);

    //   this.state = data;
    //   console.log(this.state);
      
    // });

    let result = Object.entries(this.state);
    console.log(data.value);

    const statesList = Object.values(result[data.value])[1];

    console.log((statesList as any)['cities']);
    this.city = (statesList as any)['cities'];

    console.log(this.city);
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
      console.log(this.api.loggedinUser.id);
      
      this.updateForm.controls['Address'].setValue(this.artisanData.location);
      // console.log(this.api.loggedinUser.id);
      
      this.updateForm.controls['service'].setValue(this.artisanData.address);
      // console.log(this.api.loggedinUser.id);
      
      this.updateForm.controls['state'].setValue(this.artisanData.state);
      // console.log(this.api.loggedinUser.id);
      
      this.updateForm.controls['city'].setValue(this.artisanData.city);
      // console.log(this.api.loggedinUser.id);
      
    } else {
      // this.updateForm.disable();
    }
  }

  // grandtotal() {
  //   this.alltotal = parseInt(this.result) + parseInt(this.result);
  // }
  // celltotal() {
  //   this.result = parseInt(this.num1) * parseInt(this.num2);
  // }
  // onEnter() {
  //   this.result = parseInt(this.num1) * parseInt(this.num2);
  //   this.alltotal = this.result + parseInt(this.result);
  // }

  get userFormGroups() {
    return this.usersForm.get('users') as FormArray;
  }

  // removeFormControl(i: number) {
  //   let usersArray = this.usersForm.get('users') as FormArray;
  //   usersArray.removeAt(i);
  // }

  // addFormControl() {
  //   let usersArray = this.usersForm.get('users') as FormArray;
  //   let arraylen = usersArray.length;

  //   let newUsergroup: FormGroup = this.fb.group({
  //     gHService: [''],
  //     quantity: [''],
  //     startTime: [''],
  //     total: [''],
  //   });

  //   usersArray.insert(arraylen, newUsergroup);
  // }
  onSubmit() {
    console.log(this.usersForm.value);
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

  // upload(): void {
  //   this.progress = 0;
  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);

  //     if (file) {
  //       this.currentFile = file;

  //       const uploadObserver = {
  //         next: (event: any) => {
  //           if (event.type === HttpEventType.UploadProgress) {
  //             this.progress = Math.round((100 * event.loaded) / event.total);
  //           } else if (event instanceof HttpResponse) {
  //             this.message = event.body.message;
  //           }
  //         },
  //         error: (err: any) => {
  //           this.progress = 0;
  //           if (err.error && err.error.message) {
  //             this.message = err.error.message;
  //           } else {
  //             this.message = 'Could not upload the file!';
  //           }
  //           this.currentFile = undefined;
  //         },
  //       };

  //       this.api.upload(this.currentFile).subscribe(uploadObserver);
  //     }
  //     this.selectedFiles = undefined;
  //   }
  // }


  
  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://lyticalartisanapi.azurewebsites.net/api/Artisan/upload-profile-image', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event:any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
        this.getArtisan()
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  // updateUserInformation() {
  //   this.formSubmitted = true;
  //   if (this.updateForm.valid) {
  //     this.api.updateUser(this.updateForm.value).subscribe({
  //    next:   (data) => {
  //         alertify.success('Profile successsfully updated.');
  //         alert('Profile successsfully updated.');
  //         this.updateForm.disable();
  //         this.isEditMode = false;
  //         console.log(data);
  //         this.isEditMode = !this.isEditMode;
  //       },
  //    error:   (error: any) => {
  //         alert('Profile update failed');
  //         console.log(error);

  //         alertify.error('Profile update failed');
  //       }
  //   });
  //   }
  // }

  updateUserDetails(row: any) {
    console.log(row);
    console.log(row.id);

    this.artisanProfileModelObj.userId = this.updateForm.value.userId;
    this.artisanProfileModelObj.firstName = this.updateForm.value.firstName;
    this.artisanProfileModelObj.lastName = this.updateForm.value.lastName;
    this.artisanProfileModelObj.Address = this.updateForm.value.Address;
    this.artisanProfileModelObj.city = this.updateForm.value.city;
    this.artisanProfileModelObj.state = this.updateForm.value.state;
    this.artisanProfileModelObj.phoneNumber = this.updateForm.value.PhoneNumber;
    this.artisanProfileModelObj.service = this.updateForm.value.service;

    this.api.artisanUpdate(this.updateForm.value).subscribe((res: any) => {
      console.log(res);
      this.toastr.success('Profile updated');
      this.isEditMode = this.isEditMode;
      this.updateForm.disable()
      
      this.toggleEditMode();
      this.getArtisan();
      //   alert('employee updated sucessfully');

      //   // let ref = document.getElementById('cancel'); //this is to close the modal form automatically
      //   // ref?.click();

      // this.getUserserInfo() //this is to refresh and get the resent data
    });
  }

  // onEdit() {
  //   this.updateForm.controls['userId'].setValue(
  //     this.api.loggedinUser.id
  //   );
  //   this.updateForm.controls['firstName'].setValue(
  //     this.api.loggedinUser.firstName
  //   );
  //   this.updateForm.controls['lastName'].setValue(
  //     this.api.loggedinUser.lastName
  //   );
  //   this.updateForm.controls['Address'].setValue(
  //     this.api.loggedinUser.Address
  //   );
  //   this.updateForm.controls['city'].setValue(
  //     this.api.loggedinUser.city
  //   );
  //   this.updateForm.controls['state'].setValue(
  //     this.api.loggedinUser.state
  //   );

  //   this.updateForm.controls['phoneNumber'].setValue(
  //     this.api.loggedinUser.phoneNumber
  //   );

  //   this.showAddEmployee = false;
  //   this.showUpdate = true;
  // }

  getOrder() {
    this.api.getArtisanOrder().subscribe((data: any) => {
      this.orderData = data
      console.log(this.statelga);
    });
  }

  getAllServiceCategory(){
    this.adminApi.getServiceCategory().subscribe((data:any)=>{
      this.serviceCategory = data
      console.log(this.serviceCategory);
      
    })
  }

  getState(){
    this.api.getLocation().subscribe((data:any)=>{
      this.state2= data
      console.log( this.state2);
      
    })
  }
  onChangeState(event:any){
    let userProfile =this.updateForm.controls['state'].value
    if(userProfile){
      this.api.getLocation2(userProfile).subscribe((data:any)=>{
        this. city2= data
        console.log( this.city2);
    })
  }
}
onChangeCity(event:any){
return this.updateForm.controls['city'].value
  
}
}
