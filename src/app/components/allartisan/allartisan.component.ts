import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { orderModel } from './allartisanmodel';

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

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private adminApi: AdminService
  ) {}

  ngOnInit(): void {
    this.getAllArtisan();
    this.showAll();

    this.formValue = this.formBuilder.group({
      artisanId: 0,
      name: [''],
      propertyAddress: [''],
      inspectionDate: ['2022-06-30T10:58:37.452Z'],
      inspectionTime: ['2022-06-30T10:58:37.452Z'],
      mobilenumber: [''],
      AltNumber: [''],
      issue: [''],
    });

    this.pastDateTime();
  }

  orderModelObj: orderModel = new orderModel();
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
  showAll() {
    this.api.getAllStateData().subscribe((data: any) => {
      this.statelga = data;
      console.log(this.statelga);
    });
  }

  createnewService(row: any) {
    this.orderModelObj.name = this.formValue.value.name;

    console.log(row);
    this.api
      .createService(this.orderModelObj, this.orderModelObj.id)
      .subscribe((res) => {
        this.orderModelObj.id = row.id;
        console.log(this.orderModelObj.id);
        console.log(res);

        alert('fill request form');
        // this.getAllUser(); //this is to automatically refresh the page
      });

    console.log(this.orderModelObj.id);
  }

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

  onEdit(row: any) {
    this.orderModelObj.id = row.id;
    console.log(row);

    this.formValue.controls['name'];
    this.formValue.controls[' propertyAddress'];
    this.formValue.controls[' propertyAddress'];
    this.formValue.controls['mobilenumber'];
    this.formValue.controls[' AltNumber'];
    this.formValue.controls['issue'];
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    // this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        const uploadObserver = {
          next: (event: any) => {
            console.log(event);
            
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          error: (err: any) => {
            console.log(err);
            
            // this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          },
        };
console.log(uploadObserver);

        this.api.uploadOrderIssue(this.currentFile).subscribe(uploadObserver);
      }
      this.selectedFiles = undefined;
    }
  }
}
