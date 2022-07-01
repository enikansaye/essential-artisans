import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
// import { AlertService } from 'ngx-alerts/lib/service/alert.service';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { serviceModel } from './service.model';

@Component({
  selector: 'app-servicecategory',
  templateUrl: './servicecategory.component.html',
  styleUrls: ['./servicecategory.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ServicecategoryComponent implements OnInit {
  formValue !: FormGroup;
  // Service data property
  serviceData: any;

  showAddService !: boolean;

  showUpdate !: boolean
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private adminApi: AdminService,
    private alertService: AlertService,config: NgbModalConfig, private modalService: NgbModal) {
      config.backdrop = 'static';
    config.keyboard = false;
     }

     open(content: any) {
      this.modalService.open(content);
    }

  serviceModelObj: serviceModel = new serviceModel();
  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      name: [''],
  
    });
     this.getAllService()
  }

 

  postServic() {
    this.serviceModelObj.name = this.formValue.value.name;
  
      this.alertService.info('Working on creating new account');
  
      const serviceObserver = {
        next: (res: any) => {
      
          let ref = document.getElementById('cancel'); //this is to close the modal form automatically
        ref?.click();

        this.formValue.reset(); //this is to reset the form after logging in
        this.getAllService();
        // this.router.navigate(['/checkemail']);
        },
        error: (err: any) => {
          console.log(err);
          this.alertService.danger('signup failed');
        },
      };
  
      this.adminApi.postService(this.formValue.value).subscribe(serviceObserver);
    }
    postService(){
      this.adminApi.postService(this.formValue.value).subscribe((res:any)=>{
        console.log(res);
        
      })
    }

    getAllService() {
      this.adminApi.getService().subscribe((res: any) => {
        this.serviceData = res;
      });
    }
  
    deleteServiceData(row: any) {
      this.adminApi.deleteService(row.id).subscribe((res) => {
        alert('Service deleted');
        this.getAllService(); //this is to automatically refresh the page
      });
    }
  
    // to alto fill the form button after clicking on the edit button
    onEdit(row: any) {
      this.showAddService = false;
      this.showUpdate = true;
  
      this.serviceModelObj.id = row.id;
  
      this.formValue.controls['firstname'].setValue(row.firstname);
      this.formValue.controls['lastname'].setValue(row.lastname);
      this.formValue.controls['email'].setValue(row.email);
      this.formValue.controls['mobilenumber'].setValue(row.mobilenumber);
      this.formValue.controls['salary'].setValue(row.salary);
      this.formValue.controls['handle'].setValue(row.handle);
    }
  
    updateServiceDetails() {
      this.serviceModelObj.name = this.formValue.value.name;
    
  
      this.adminApi
        .updateService(this.serviceModelObj, this.serviceModelObj.name)
        .subscribe((res: any) => {
          console.log(res);
          alert('Service updated sucessfully');
  
          let ref = document.getElementById('cancel'); //this is to close the modal form automatically
          ref?.click();
  
          this.formValue.reset(); //this is to reset the form after logging in
          this.getAllService() //this is to refresh and get the resent data
        });
    }
  
    clickAddService(){
  this.formValue.reset();
  this.showAddService = true;
  this.showUpdate = false;
    }
  
  
  }


