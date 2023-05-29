import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/admin.service';
import { servicecategoryModel } from './servicecategory.model';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-servicecategory',
  templateUrl: './servicecategory.component.html',
  styleUrls: ['./servicecategory.component.css'],
})
export class ServicecategoryComponent implements OnInit {
  serviceData: any;
  showAddService!: boolean;
  feeForm!: FormGroup;
  showUpdate!: boolean;
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  selectedFiles!: FileList;
  progressInfos!: [];

  servicecategoryModelObj: servicecategoryModel = new servicecategoryModel();
  progress: number = 0;
  message: any;
  submitted: boolean = false;

  constructor(
    private adminApi: AdminService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private api : ApiService,
    private http: HttpClient
  ) {}
  formValue!: FormGroup;
  updateFormValue!: FormGroup;
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      Name: [''],
      File: ['']
    });

    this.updateFormValue = this.formBuilder.group({
      oldName: [''],
      newName: [''],
    });
    this.feeForm = this.formBuilder.group({
      inspectionFee: 0,
    });

    this.getAllServiceCategory();
  }

  selectFiles(event: any) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  // postServiceCategory1() {
  //   this.servicecategoryModelObj.name = this.formValue.value.name;
  //   if (this.formValue.valid) {
  //     this.adminApi.postServiceCategory(this.formValue.value).subscribe(
  //       (result) => {
  //         // this.toastr.success('artisan Approved')

  //         this.toastr.success('ServiceCategory added sucessfully');
  //         this.modalRef?.hide();

  //         let ref = document.getElementById('cancel'); //this is to close the modal form automatically
  //         ref?.click();

  //         this.formValue.reset(); //this is to reset the form after logging in
  //         this.getAllServiceCategory();
  //       },
  //       (err: any) => {
  //         this.toastr.warning('something went wrong');
  //       }
  //     );
  //   }
  // }
  postServiceCategory(data: any) {
    console.log(data);
    
    this.submitted = true;
    
    // this.servicecategoryModelObj.name = this.formValue.value.Name;

    const formdata = new FormData();

    formdata.append('Name', data.Name);
    // formdata.append('File', data.File);
  ;
    

    const uploadObserver = {
      next: (event: any) => {
        this.modalRef?.hide();
        this.toastr.success('Order successfully sent!!!');

        this.formValue.reset();
      },
      error: (err: any) => {
        
        this.progress = 0;
        if (err.error || err.error.message) {
          this.message = err.error.message;
          
        } else {
          
          
        }
      },
    };

    this.adminApi.postServiceCategory(formdata).subscribe(uploadObserver);
  }

  getAllServiceCategory() {
    this.adminApi.getServiceCategory().subscribe((res: any) => {
      this.serviceData = res;
    });
  }

  deleteServiceCategory(row: any) {
    this.adminApi.deleteServiceCategory(row.name).subscribe((res) => {
      this.toastr.success('service category deleted');
      this.getAllServiceCategory(); //this is to automatically refresh the page
    });
  }

  // to alto fill the form button after clicking on the edit button
  onEdit(row: any) {
    this.showAddService = false;
    this.showUpdate = true;

    this.servicecategoryModelObj.name = row.name;
    this.servicecategoryModelObj.oldName = row.name;
    this.servicecategoryModelObj.newName = row.newName;

    // this.formValue.controls['oldName'].setValue(row.name);
  }

  updateServiceCategory(data: any) {
    this.servicecategoryModelObj.oldName = this.updateFormValue.value.oldName;
    this.servicecategoryModelObj.newName = this.updateFormValue.value.newName;

    this.adminApi
      .updateServiceCategory(this.updateFormValue.value)
      .subscribe((res: any) => {
        this.toastr.success('ServiceCategory updated sucessfully');
        this.modalRef?.hide();
        let ref = document.getElementById('cancel'); //this is to close the modal form automatically
        ref?.click();

        this.formValue.reset(); //this is to reset the form after logging in
        this.getAllServiceCategory(); //this is to refresh and get the resent data
      });
  }

  hidden: boolean = false;

  changeFee() {
    this.hidden = !this.hidden;
  }
  changeInspectionFee() {
    const inspectionObserver = {
      next: (res: any) => {
        this.toastr.success('Inspection Fee Sucessfully Updated!!');
        this.feeForm.reset();
        this.hidden = !this.hidden;
      },
      err: (err: any) => {
        this.toastr.warning('Something Went wrong!!');
      },
    };
    this.adminApi
      .inspectionFee(this.feeForm.value)
      .subscribe(inspectionObserver);
  }

  clickAddServiceCategory() {
    this.formValue.reset();
    this.showAddService = true;
    this.showUpdate = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      id: 1,
      class: 'modal-lg',
    });
  }
}
