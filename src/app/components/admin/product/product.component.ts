import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;

  modalRef?: BsModalRef;
  config = {
    animated: true,
  };
  submitted: boolean = false;
  progress!: number;
  message: any;
  selectedFiles!: FileList;
  progressInfos!: [];
  categoryData: any;
  subCategory: any;

  constructor(
    private adminApi: AdminService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Description: ['', Validators.required],
      StockQuantity: [''],
      Files: [''],
      File: [''],
      FileNames: [''],
      CategoryId: [],
      SubCategoryId: [],
    });
  }
  get f() {
    return this.productForm.controls;
  }

  // selectFiles(event: any) {
  //   this.progressInfos = [];
  //   console.log(event);

  //   this.selectedFiles = event.target.File;
  //   console.log(this.selectedFiles);

  // }

  // onFileSelected(event) {
  //   this.formData.image = event.target.files[0];
  // }

  onSubmitCheck1(data: any) {
    this.submitted = true;
    console.log(data);

    if (data.length === 0) {
      return;
    }
    let fileToUpload = <File>data[0];
    // const formData = new FormData();

    // this.productForm.value.ArtisanId = data.ArtisanId;

    const formdata = new FormData();

    formdata.append('Name', data.Name);
    formdata.append('Description', data.Description);
    formdata.append('Price', data.Price);
    formdata.append('StockQuantity', data.StockQuantity);
    formdata.append('CategoryId', data.CategoryId);
    formdata.append('SubCategoryId', data.SubCategoryId);
    // formdata.append('File', data.File);
    // formdata.append('File', fileToUpload, fileToUpload.File);

    const uploadObserver = {
      next: (event: any) => {
        this.modalRef?.hide();
        this.toastr.success('Order successfully sent!!!');

        this.productForm.reset();
      },
      error: (err: any) => {
        this.progress = 0;
        if (err.error || err.error.message) {
          this.message = err.error.message;
        } else {
        }
      },
    };

    this.api.createProduct(formdata).subscribe(uploadObserver);
  }

  onSubmitCheck(data: any) {
    console.log(data);
    
    this.submitted = true;
    const formdata = new FormData();
    // formdata.append('ArtisanId', data.ArtisanId);
    formdata.append('Name', data.Name);
    formdata.append('Description', data.Description);
    formdata.append('Price', data.Price);
    formdata.append('StockQuantity', data.StockQuantity);
    formdata.append('CategoryId', data.CategoryId);
    formdata.append('SubCategoryId', data.SubCategoryId);
   
    if (this.selectedFiles) {
      const fileNames: string[] = [];
      console.log("this is filesnames: ", fileNames);

      const files = Object.values(this.selectedFiles);
      console.log("this is files: ", files);
      console.log("this is files.name: ", files);
      

      for (const file of files) {
        fileNames.push(file.name);
        
      }

      for (const File of files) {
        console.log(File);
        
        formdata.append('Files', File);
      }
    }

    const uploadObserver = {
      next: (event: any) => {
        this.modalRef?.hide();
        this.toastr.success('Order successfully sent!!!');

        this.productForm.reset();
      },
      error: (err: any) => {
        this.progress = 0;
        if (err.error || err.error.message) {
          this.message = err.error.message;
        } else {
        }
      },
    };
    this.api.createProduct(formdata).subscribe(uploadObserver);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  getCategory() {
    return this.adminApi.getServiceCategory().subscribe((res) => {
      console.log(res);
      this.categoryData = res;
    });
  }
  // subCategory: any
  getEstateNotification(data: any) {
    console.log(data);
    this.productForm.controls['CategoryId'].setValue(data.categoryId);

    this.subCategory = data.subCategories;
    console.log(this.subCategory.name);
    console.log(this.subCategory.SubCategoryId);
    this.productForm.controls['SubCategoryId'].setValue(
      this.subCategory.SubCategoryId
    );
  }
  // subCategory: any
  getSubcategory(data: any) {
    console.log(data);

    this.productForm.controls['SubCategoryId'].setValue(data.subCategoryId);
  }

  selectFiles(event: any) {
    
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    
  }
}
