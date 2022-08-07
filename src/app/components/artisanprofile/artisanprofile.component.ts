import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { userProfileModel } from '../userprofile/userprofile.model';

declare let alertify: any;
@Component({
  selector: 'app-artisanprofile',
  templateUrl: './artisanprofile.component.html',
  styleUrls: ['./artisanprofile.component.css'],
})
export class ArtisanprofileComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  userProfileModelObj: userProfileModel = new userProfileModel();

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
  progress = 0;
  message = '';
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

  constructor(
    private observer: BreakpointObserver,
    public api: ApiService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      email: [''],

      state: [''],
     city: [''],
      service : [''],
      phoneNumber: [''],
      address: [''],

  

    });
    this.updateForm.disable();
    this.formControls = this.updateForm.controls;

    this.getArtisan()
  }

  getArtisan(){
      this.api.getArtisaninfo( this.api.loggedinUser.id).subscribe(
        
        
        (res: any) => {
        console.log(res);
        
        this.artisanData = res;
        console.log(this.artisanData);
        
      });
    }


  // sellection of location
  // showAll() {
  //   this.api.getAllStateData().subscribe((data: any) => {
  //     this.statelga = data;
  //     console.log(this.statelga);
  //   });
  // }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.formControls['firstName'].enable();
      this.formControls['lastName'].enable();
      this.formControls['PhoneNumber'].enable();
      this.formControls['address'].enable();
      this.formControls['service'].enable();

      this.formControls['state'].enable();
      this.formControls['city'].enable();
      // this.formControls['email'].enable();


      this.updateForm.controls['firstName'].setValue(
        this.api.loggedinUser.userName
      );
      this.updateForm.controls['lastName'].setValue(
        this.api.loggedinUser.lastName
      );
      this.updateForm.controls['email'].setValue(this.api.loggedinUser.email);
      // this.updateForm.controls['email'].setValue(data.email);
      this.updateForm.controls['PhoneNumber'].setValue(
        this.api.loggedinUser.PhoneNumber
      );
  
  
    } else {
      this.updateForm.disable();
    }
  }

  grandtotal() {
    this.alltotal = parseInt(this.result) + parseInt(this.result);
  }
  celltotal() {
    this.result = parseInt(this.num1) * parseInt(this.num2);
  }
  onEnter() {
    this.result = parseInt(this.num1) * parseInt(this.num2);
    this.alltotal = this.result + parseInt(this.result);
  }

  get userFormGroups() {
    return this.usersForm.get('users') as FormArray;
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
    });

    usersArray.insert(arraylen, newUsergroup);
  }
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

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        const uploadObserver = {
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          error: (err: any) => {
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          },
        };

        this.api.upload(this.currentFile).subscribe(uploadObserver);
      }
      this.selectedFiles = undefined;
    }
  }

  updateUserInformation() {
    this.formSubmitted = true;
    if (this.updateForm.valid) {
      this.api.updateUser(this.updateForm.value).subscribe({
     next:   (data) => {
          alertify.success('Profile successsfully updated.');
          alert('Profile successsfully updated.');
          this.updateForm.disable();
          this.isEditMode = false;
          console.log(data);
          this.isEditMode = !this.isEditMode;
        },
     error:   (error: any) => {
          alert('Profile update failed');
          console.log(error);

          alertify.error('Profile update failed');
        }
    });
    }
  }

  updateArtisanDetails() {
    this.userProfileModelObj.firstName = this.updateForm.value.firstName;
    this.userProfileModelObj.lastName = this.updateForm.value.lastName;

    this.userProfileModelObj.service = this.updateForm.value.service;
    this.userProfileModelObj.state = this.updateForm.value.state;
    this.userProfileModelObj.city = this.updateForm.value.city;
    this.userProfileModelObj.phoneNumber = this.updateForm.value.phoneNumber;
    this.userProfileModelObj.address = this.updateForm.value.address;
    // this.userProfileModelObj.email = this.updateForm.value.email;
    this.userProfileModelObj.mobilenumber = this.updateForm.value.mobilenumber;


    this.api.artisanUpdate(this.userProfileModelObj).subscribe((res: any) => {
      console.log(res);
        alert('employee updated sucessfully');
        
        

      //   // let ref = document.getElementById('cancel'); //this is to close the modal form automatically
      //   // ref?.click();

      //   // this.getUserserInfo() //this is to refresh and get the resent data
    });
    console.log("failes");
    
  }
}
