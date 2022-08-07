
import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { orderModel } from './allartisanmodel';

// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-allartisan',
  templateUrl: './allartisan.component.html',
  styleUrls: ['./allartisan.component.css'],
})
export class AllartisanComponent implements OnInit {
  statelga: any;
  selectedStatelga: any = {
    id: 0,
    name: '',
  };

  formValue!: FormGroup;
  min: any = '';
  value: any;
  artisanData: any;

  totalRecord: any;
  page: number = 1;

  location = '';
  searchLocation = '';
  selectedFiles: any;
  currentFile?: File;
  message: any;
  progress!: number;

  orderModelObj: orderModel = new orderModel();
  countries: any;


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
    

    this.sortArtisan();

    this.formValue = this.formBuilder.group({
      id: this.api.loggedinUser.id,
      name: ['asdfghj'],
      artisanId: 0,

      propertyAddress: [''],
      inspectionDate: ['2022-06-30T10:58:37.452Z'],
      inspectionTime: ['2022-06-30T10:58:37.452Z'],
      mobilenumber: [''],
      AltNumber: [''],
      issue: [''],

      issueImage:File,
      file: [''],
      artisanEmail: [],

      fileSource: [''],

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
  


  onEdit(row: any) {
    this.orderModelObj.id = row.id;
    console.log(this.orderModelObj.id);
    console.log(row);
   
    this.formValue.controls['artisanId'].setValue(row.id);
 
  }

  createnewService(data:string) {
    this.api.createService(data).subscribe((res) => {
      // this.orderModelObj.name = this.formValue.value.name;
      this.toastr.success('Order successfully sent!!!')
      console.log(this.orderModelObj.id);
      console.log(res);

      // alert('fill request form');
    });

    console.log(this.orderModelObj);
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
    this.searchLocation = this.location;
  }


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  working = false;
  uploadFile?: File | null;
  uploadFileLabel: string | undefined = 'Choose an image to upload';
  uploadProgress: number = 0;
  uploadUrl!: string;

  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.uploadFile = files.item(0);
      this.uploadFileLabel = this.uploadFile?.name;
    }
  }

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

  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

    this.http
      .post(
        'https://lyticalartisanapi.azurewebsites.net/api/Customer/ServiceOrder/upload',
        imageFormData,
        { observe: 'response' }
      )
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      });
  }

}
