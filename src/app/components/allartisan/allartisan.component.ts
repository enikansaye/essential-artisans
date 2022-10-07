import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { orderModel } from './allartisanmodel';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { FileToUpload } from '../../file-upload/file-to-upload';
import { toFormData } from './toFormData';
import { UserService } from 'src/app/service/user.service';

import { LoginService } from 'src/app/service/login.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

// import { ToastrService } from 'ngx-toastr';

// Maximum file size allowed to be uploaded = 1MB
const MAX_SIZE: number = 1048576;

@Component({
  selector: 'app-allartisan',
  templateUrl: './allartisan.component.html',
  styleUrls: ['./allartisan.component.css'],
})
export class AllartisanComponent implements OnInit {
  // clickEventSubscription !: Subscription;
  @Output() public onUploadFinished = new EventEmitter();

  myimage!: Observable<any>;

  theFile: any = '';
  messages: string[] = [];

  location: any;
  city: any;
  selectedCountry: any = {
    id: 0,
    name: '',
    cities: '',
  };

  formValue!: FormGroup;
  search!: FormGroup;
  min: any = '';
  value: any;
  artisanData: any;

  totalRecord: any;
  page: number = 1;
  rating3:number= 0;
  // location = '';
  searchLocation = '';
  selectedFiles!: FileList;

  currentFile?: File;
  message: any;
  progress!: number;
  orderModelObj: orderModel = new orderModel();
  countries: any;
  state2: any;
  city2: any;

  myFiles: string[] = [];
  issue!: string;

  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  progressInfos!:[];
  fileInfos!: Observable<any>;

   
 

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private adminApi: AdminService,
    private http: HttpClient,
    private login : LoginService,
    private modalService: BsModalService,
    private toastr: ToastrService,private data: UserService
  ) {

    this.formValue = this.formBuilder.group({
      id: this.login.loggedinUser.id,
      Name: [''],
      ArtisanId: 2,
      PropertyAddress: [''],
      InspectionDateAndTime: [''],
      // InspectionTime: [''],
      PhoneNumber: [''],
      AlternateNumber: [''],
      Issue: [''],
      profile: [''],
      files: [''],
      Files: [''],
      FileNames: [''],
      artisanEmail: [],
      orderId: [],
    });

 
  }
  text: any;

  getArtisan(name:any){
    this.api.getArtisanByService(name).subscribe((res:any) =>{
      console.log(res);
      
    })

  }

  ngOnInit(): void {
    // this.getAllArtisan();
    // this.showAll();
    this.getState();
    
  this.update()
    
// console.log(this.data.checkArtisan);

    

   
    this.search = this.formBuilder.group({
      state: [''],
      city: [''],
    });

    this.pastDateTime();
  }

  // date and time selection
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

  onEdit(row: any) {
    this.orderModelObj.id = row.id;
    console.log(this.orderModelObj.id);
    console.log(row);

    this.formValue.controls['ArtisanId'].setValue(row.id);
  }

  // createnewService(data: any) {
  //   console.log(data);
  //   console.log(data.artisanId);
  //   // this.orderModelObj.artisanId = data.artisanId;
  //   // this.formValue.artisanId = data.artisanId
  //   // const formData = new FormData();
  //   // formData.append('file', this.formValue.controls['files'].value);
  //   this.formValue.value.artisanId = data.artisanId;


  //   this.api.createService(this.formValue.value).subscribe((res) => {
  //     this.formValue.controls['artisanId'].setValue(data.artisanId);
  //     this.formValue.value.artisanId = data.artisanId;
  //     console.log(data.artisanId);

  //     this.toastr.success('Order successfully sent!!!');
  //     console.log(this.orderModelObj.id);
  //     console.log(res);

  //     // alert('fill request form');
  //   });

  //   // console.log(this.orderModelObj);
  // }

  

  submitCheck(data: any) {
    const formData = new FormData();
    console.log(data);
    console.log(formData);

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('file[]', this.myFiles[i]);
    }

    this.http
      .post(this.api.baseUrl +'/api/Customer/ServiceOrder/create', this.formValue.value)
      .subscribe((res) => {
        console.log(res);
        alert('Uploaded Successfully.');
      });
  }
 selectedFile: File | any= null;
onSelectedFile(e: any){
    this.selectedFile = e.target.files[0];
}
  
  onSubmitCheck(data:any){

    console.log(this.formValue.value);
        this.orderModelObj.artisanId = data.ArtisanId;
        console.log(data.ArtisanId);
        
  //   // this.formValue.artisanId = data.artisanId

        // this.formValue.artisanId = data.artisanId


        // this.formValue.value.controls['ArtisanId'].setValue(data.ArtisanId);
        this.formValue.value.ArtisanId = data.ArtisanId;

      


const fileNames = []
const files = Object.values(this.selectedFiles)

for (const file of files) {
  fileNames.push(file.name)
  console.log(fileNames); 
}

const formdata = new FormData();

formdata.append("ArtisanId", data.ArtisanId);
formdata.append("Name", data.Name);
formdata.append("Issue", data.Issue);
formdata.append("InspectionDateAndTime", data.InspectionDateAndTime);
// formdata.append("InspectionTime", data.InspectionTime);
formdata.append("AlternateNumber", data.AlternateNumber);
formdata.append("PhoneNumber", data.PhoneNumber);
formdata.append("PropertyAddress", data.PropertyAddress);
    // formdata.append("Files", data.Files, this.formValue.value.FileNames)
    // formdata.append("Files", fileNames.join(', '))
    

    for (const file of files) {
      formdata.append("files", file)  
    }

    // for (let i = 0; i < this.selectedFiles.length; i++) {
    //   // this.upload2(i, this.selectedFiles[i]);
      
 
      
    //  }

    console.log(formdata);
    console.log(this.formValue.value);
    
    

    // formdata.append("files", )

// formdata.append("files", data.files);


   this.http
       .post(this.api.baseUrl + '/api/Customer/ServiceOrder/create', formdata, {
        reportProgress: true,
        responseType: 'json',
      }
       ).subscribe((res:any)=>{
        this.modalRef?.hide()
              this.toastr.success('Order successfully sent!!!');

        // this.f.reset();

        // this.formValue.controls['ArtisanId']= data.ArtisanId;

              // this.formValue.controls['ArtisanId'].setValue(data.ArtisanId);
                    // this.formValue.value.ArtisanId = data.ArtisanId;


        console.log(res);
        
       })
   
  }


    
  

  // onFileChange(event:any) {
  
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.formValue.patchValue({
  //       fileName: file
  //     });
  //   }
  // }


  
  // get all available artisans
  getAllArtisan() {
    this.adminApi.getArtisan().subscribe((res: any) => {
      this.artisanData = res;
      console.log(res);
      this.totalRecord = res.length;
      console.log(this.totalRecord);
      console.log(this.artisanData);
    });
  }
// location filter section
  // onLocationFilter() {
  //   // this.searchLocation = this.location;
  //   this.api.sortArtisanLocation().subscribe((res: any) => {
  //     console.log(res);
  //   });
  // }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  working = false;
  // uploadFile?: File | null;
  uploadFileLabel: string | undefined = 'Choose an image to upload';
  uploadProgress: number = 0;
  uploadUrl!: string;

  // handleFileInput(files: FileList) {
  //   if (files.length > 0) {
  //     this.uploadFile = files.item(0);
  //     this.uploadFileLabel = this.uploadFile?.name;
  //   }
  // }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      console.log(this.selectedFiles);

      if (file) {
        this.currentFile = file;

        const uploadObserver = {
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
            console.log('done');
          },
          error: (err: any) => {
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
            console.log(err);
          },
        };

        this.api.uploadIssue(this.currentFile).subscribe(uploadObserver);
      }
      // this.selectedFiles = undefined;
      console.log();
    }
  }

  

  sortArtisan() {
    // this.api.sortArtisanLocation().subscribe((data: any) => {
    //   const result = Object.entries(data);
    //   console.log(data.state);

    //   // this.countries = data;
    // });

    // // this.api.getAll().subscribe((data: any, i: any) => {
    // //   const result = Object.entries(data);

    // //   this.countries = data;
    // // });
  }

  uploadedImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse!: string;
  image: any;

  submit(): void {
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

        this.api.uploadIssue(this.currentFile).subscribe(uploadObserver);
      }
      // this.selectedFiles = undefined;
    }
  }

 

  getState() {
    this.api.getLocation().subscribe((data: any) => {
      this.state2 = data;
      console.log(this.state2);
    });
  }
  onChangeState(event: any) {
    let userProfile = this.search.controls['state'].value;
    if (userProfile) {
      this.api.getLocation2(userProfile).subscribe((data: any) => {
        this.city2 = data;
        console.log(this.city2);
      });
    }
  }
  onChangeCity(event: any) {
    return this.search.controls['city'].value;
  }

hope!:any
  Search() {
    if (this.location == '') {
      console.log(location);
      
      this.getAllArtisan();
    } else {
      this.artisanData  = this.artisanData.filter((res: any) => {
        console.log(res);
        
        return res.location
          .toLocaleLowerCase()
          .match(this.location.toLocaleLowerCase());
      });
    }
return this.hope;
  }

  update(){
    this.artisanData = this.data.getClickEvent().subscribe((data:any)=>{
      if(data != ''){
        this.api.getArtisanByService(data).subscribe((res:any) =>{
          console.log(res);
          this.artisanData =res
        })
      }
      console.log(data);
      console.log(this.data.checkData);
      
      
            // this.checkData();
          });
  }
  images : string[] = [];
  uploadfile(event:any){
const file = event?.target.files? event.target.files[0]:''
// console.log(file);
this.formValue.patchValue({
  files:file
})
// this.formValue.get('image')?.updateValueAndValidity()

  }
  // onSubmitCheck2(){
  //   this.api.uploadCheck(
  //    this.formValue.value.id = this.login.loggedinUser.id,
  //    this.formValue.value.Name,
  //    this.formValue.value.ArtisanId,
  //    this.formValue.value.PropertyAddress,
  //   //  this.formValue.value.inspectionDate,
  //   //  this.formValue.value.inspectionTime,
  //    this.formValue.value.PhoneNumber,
  //    this.formValue.value.AlternateNumber,
  //    this.formValue.value.Issue,
  //    this.formValue.value.profile,
  //    this.formValue.value.Files,
  //    this.formValue.value.artisanEmail,
  //    this.formValue.value.orderId,
  //   ).subscribe((event:HttpEvent<any>)=>{
  //     switch(event.type){
  //       case HttpEventType.Response:
  //         console.log(event.body);
          
  //       event.body

  //     }
     
  //   })
  // }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      id: 1,
      class: 'modal-lg',
    });
  }

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }

  // images : string[] = [];
  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
               
                var reader = new FileReader();
     
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.images.push(event.target.result); 
   
                   this.formValue.patchValue({
                    FileNames: this.images
                   });
                }
    
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  submit2(){
    console.log(this.formValue.value);
    this.http.post(this.api.baseUrl + '/api/Customer/ServiceOrder/create', this.formValue.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  selectFiles(event:any) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles );
    
    
  }

  uploadFiles() {
    this.message = '';
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
     this.upload2(i, this.selectedFiles[i]);

     
    }
  }

  upload2(idx:any, file:any) {
    // this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.api.upload3(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          // this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        // this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }
}