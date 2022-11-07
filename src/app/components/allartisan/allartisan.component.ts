import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { orderModel } from './allartisanmodel';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { toFormData } from './toFormData';
import { UserService } from 'src/app/service/user.service';

import { LoginService } from 'src/app/service/login.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  rating3: number = 0;
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
  searchText:any
  myFiles: string[] = [];
  issue!: string;

  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  progressInfos!: [];
  fileInfos!: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private adminApi: AdminService,
    private http: HttpClient,
    private login: LoginService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private data: UserService,
    
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

  

  ngOnInit(): void {
    this.getState();
    // this.data.sendClickEvent(this.text)
    
// this.getArtisan(this.text)
    this.update();

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

  onEdit(row: any) {
    this.orderModelObj.id = row.id;

    this.formValue.controls['ArtisanId'].setValue(row.id);
  }

  // submitCheck(data: any) {
  //   const formData = new FormData();

  //   for (var i = 0; i < this.myFiles.length; i++) {
  //     formData.append('file[]', this.myFiles[i]);
  //   }

  //   this.http
  //     .post(
  //       this.api.baseUrl + '/api/Customer/ServiceOrder/create',
  //       this.formValue.value
  //     )
  //     .subscribe((res) => {
  //       alert('Uploaded Successfully.');
  //     });
  // }
  selectedFile: File | any = null;
  onSelectedFile(e: any) {
    this.selectedFile = e.target.files[0];
  }

  onSubmitCheck(data: any) {
    this.orderModelObj.artisanId = data.ArtisanId;

    this.formValue.value.ArtisanId = data.ArtisanId;

    const formdata = new FormData();

    formdata.append('ArtisanId', data.ArtisanId);
    formdata.append('Name', data.Name);
    formdata.append('Issue', data.Issue);
    formdata.append('InspectionDateAndTime', data.InspectionDateAndTime);
    formdata.append('AlternateNumber', data.AlternateNumber);
    formdata.append('PhoneNumber', data.PhoneNumber);
    formdata.append('PropertyAddress', data.PropertyAddress);
    // formdata.append("Files", data.Files, this.formValue.value.FileNames)
    // formdata.append("Files", fileNames.join(', '))
    if (this.selectedFiles) {
      const fileNames = [];
      const files = Object.values(this.selectedFiles);

      for (const file of files) {
        fileNames.push(file.name);
      }

      for (const file of files) {
        formdata.append('files', file);
      }
    }

    const uploadObserver = {
      next: (event: any) => {
        this.modalRef?.hide();
        this.toastr.success('Order successfully sent!!!');

        this.formValue.reset();
      },
      error: (err: any) => {
        this.progress = 0;
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not upload the file!';
        }
      },
    };

    this.http
      .post(this.api.baseUrl + '/api/Customer/ServiceOrder/create', formdata, {
        reportProgress: true,
        responseType: 'json',
      })
      .subscribe(uploadObserver);
  }

  // get all available artisans
  getAllArtisan() {
    this.adminApi.getArtisan().subscribe((res: any) => {
      
      this.artisanData = res;
      this.totalRecord = res.length;
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

  uploadedImage!: File;
  dbImage: any;
  postResponse: any;
  successResponse!: string;
  image: any;

  getState() {
    this.api.getLocation().subscribe((data: any) => {
      this.state2 = data;
    });
  }
  onChangeState(event: any) {
    let userProfile = this.search.controls['state'].value;
    if (userProfile) {
      this.api.getLocation2(userProfile).subscribe((data: any) => {
        this.city2 = data;
      });
    }
  }
  onChangeCity(event: any) {
    return this.search.controls['city'].value;
  }

  hope!: any;
  Search(event: any) {
    if (this.location == '') {
      this.update()
        } else {
      this.artisanData = this.artisanData.filter((res: any) => {
        return res.location
          .toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
    return this.hope;
  }



  update() {
    this.artisanData = this.data.getClickEvent().subscribe((data: any) => {
      
      if (data != '') {
        this.api.getArtisanByService(data).subscribe((res: any) => {
          
          this.artisanData = res;
        });
      }

      // this.checkData();
    });
  }

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

  selectFiles(event: any) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  
}
