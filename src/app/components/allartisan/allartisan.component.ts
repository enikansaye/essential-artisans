import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { orderModel } from './allartisanmodel';
import { Observable, Subscriber } from 'rxjs';
import { FileToUpload } from '../../file-upload/file-to-upload';
// import { ToastrService } from 'ngx-toastr';

// Maximum file size allowed to be uploaded = 1MB
const MAX_SIZE: number = 1048576;

@Component({
  selector: 'app-allartisan',
  templateUrl: './allartisan.component.html',
  styleUrls: ['./allartisan.component.css'],
})
export class AllartisanComponent implements OnInit {
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

  // location = '';
  searchLocation = '';
  selectedFiles: any;
  currentFile?: File;
  message: any;
  progress!: number;
  orderModelObj: orderModel = new orderModel();
  countries: any;
  state2: any;
  city2: any;

  myFiles: string[] = [];
  issue!: string;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private adminApi: AdminService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllArtisan();
    // this.showAll();
    this.getState();
    this.sortArtisan();

    this.formValue = this.formBuilder.group({
      id: this.api.loggedinUser.id,
      name: [''],
      artisanId: 0,
      propertyAddress: [''],
      inspectionDate: ['2022-06-30T10:58:37.452Z'],
      inspectionTime: ['2022-06-30T10:58:37.452Z'],
      mobilenumber: [''],
      AltNumber: [''],
      issue: [''],
      profile: [''],
      files: [''],
      issueImage: [''],
      artisanEmail: [],
      orderId: [],
      fileSource: [''],
    });

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

    this.formValue.controls['artisanId'].setValue(row.id);
  }

  createnewService(data: any) {
    console.log(data);
    console.log(data.artisanId);
    // this.orderModelObj.artisanId = data.artisanId;
    // this.formValue.artisanId = data.artisanId
    const formData = new FormData();
    formData.append('file', this.formValue.controls['files'].value);

    this.api.createService(formData).subscribe((res) => {
      this.formValue.controls['artisanId'].setValue(data.artisanId);
      this.formValue.value.artisanId = data.artisanId;
      console.log(data.artisanId);

      this.toastr.success('Order successfully sent!!!');
      console.log(this.orderModelObj.id);
      console.log(res);

      // alert('fill request form');
    });

    // console.log(this.orderModelObj);
  }

  submitCheck(data: any) {
    const formData = new FormData();
    console.log(data);
    console.log(formData);

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('file[]', this.myFiles[i]);
    }

    this.http
      .post('https://localhost:7130/api/Customer/ServiceOrder/upload', formData)
      .subscribe((res) => {
        console.log(res);
        alert('Uploaded Successfully.');
      });
  }

  onFileSelect(event: any) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.formValue.controls['files'].setValue(file);
    // }
    this.selectedFiles = event.target.files;
  }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

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

  onLocationFilter() {
    // this.searchLocation = this.location;
    this.api.sortArtisanLocation().subscribe((res: any) => {
      console.log(res);
    });
  }

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
      this.selectedFiles = undefined;
      console.log();
    }
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http
      .post(
        'https://localhost:7130/api/Customer/ServiceOrder/upload',
        formData,
        { reportProgress: true, observe: 'events' }
      )
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round((100 * event.loaded) / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
          // this.getArtisan()
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  }

  sortArtisan() {
    this.api.sortArtisanLocation().subscribe((data: any) => {
      const result = Object.entries(data);
      console.log(data.state);

      // this.countries = data;
    });

    // this.api.getAll().subscribe((data: any, i: any) => {
    //   const result = Object.entries(data);

    //   this.countries = data;
    // });
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
      this.selectedFiles = undefined;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.formValue.controls['profile'].value);

    this.http
      .post<any>(
        'https://lyticalartisanapi.azurewebsites.net/api/Customer/ServiceOrder/upload',
        formData
      )
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
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
}
