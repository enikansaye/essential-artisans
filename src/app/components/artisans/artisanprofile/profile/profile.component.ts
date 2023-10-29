import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { userProfileModel } from 'src/app/components/customer/userprofile/userprofile.model';
import { ApiService } from 'src/app/service/api.service';
import { ArtisansService } from 'src/app/service/artisans.service';
import { LoginService } from 'src/app/service/login.service';
import { SignalrService } from 'src/app/service/signalr.service';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  artisanProfileModelObj: userProfileModel = new userProfileModel();
  @Output() public onUploadFinished = new EventEmitter();

  isEditMode: boolean = false;

  updateForm!: FormGroup;
  formControls: any;
  progress=0;
  message='';
  artisanData: any;
  bankName: any;
  bankData: any;
  city2: any;
  state2: any;
  serviceCategory: any;

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
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getArtisan();
    this.getState()
    this.getAllServiceCategory();
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
      bankName: [''],
  bankCode: [''],
  accountNumber:['']
    });
    this.updateForm.disable();
    this.formControls = this.updateForm.controls;

    
  }
  getAllServiceCategory(){
    this.adminApi.getServiceCategory().subscribe((data:any)=>{
      this.serviceCategory = data
      
    })
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
  getArtisan() {
    this.api.getArtisaninfo().subscribe((res: any) => {

      this.artisanData = res;
    });
  }

  getState(){
    this.api.getLocation().subscribe((data:any)=>{
      this.state2= data
      
    })
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
    this.artisanProfileModelObj.accountNumber = this.updateForm.value.accountNumber;
    this.artisanProfileModelObj.bankCode = this.updateForm.value.bankCode;
    this.artisanProfileModelObj.bankName = this.bankName;
    this.updateForm.value.bankName =this.bankName



    this.artisanurl.artisanUpdate(this.updateForm.value).subscribe((res: any) => {
      this.toastr.success('Profile updated');
      this.isEditMode = this.isEditMode;
      this.updateForm.disable()
      
      this.toggleEditMode();
      this.getArtisan();
     
    });
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
      this.formControls['bankName'].enable();
      this.formControls['bankCode'].enable();
      this.formControls['accountNumber'].enable();

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
      this.updateForm.controls['bankName'].setValue(this.bankName);
      
    } else {
      this.updateForm.disable();
    }
  }
  getBanks() {
    this.api.getAllBanks().subscribe((res: any) => {
      this.bankData = res;
    });
  } 
  onBanks(data: any) {
    const hope =this.updateForm.value.bankCode
    let bankNewName = this.bankData.find((s:any) => s.code === hope);
    this.bankName = bankNewName.name
    
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

}
