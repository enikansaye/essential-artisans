import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { servicecategoryModel } from './servicecategory.model';

@Component({
  selector: 'app-servicecategory',
  templateUrl: './servicecategory.component.html',
  styleUrls: ['./servicecategory.component.css']
})
export class ServicecategoryComponent implements OnInit {
  serviceData: any;
  showAddService!: boolean;
  showUpdate!: boolean;
  servicecategoryModelObj: servicecategoryModel = new servicecategoryModel();

  constructor( private adminApi:AdminService, private formBuilder: FormBuilder) { }
  formValue !: FormGroup;
  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      name: [''],
    
    })  

    this.getAllServiceCategory();
  }


  postServiceCategory() {
    this.servicecategoryModelObj.name = this.formValue.value.name;
 
    if (this.formValue.valid) {
      this.adminApi.postServiceCategory(this.formValue.value).subscribe((result) => {
        console.log(result);
        alert('ServiceCategory added sucessfully');

        let ref = document.getElementById('cancel'); //this is to close the modal form automatically
        ref?.click();

        this.formValue.reset(); //this is to reset the form after logging in
        this.getAllServiceCategory();
      },
      (err: any) => {
        alert('something went wrong');
      }
    );
     }
    
    
  //   this.adminApi.postServiceCategory(this.servicecategoryModelObj).subscribe(
  //   next:  (res: any) => {
  //       console.log(res);
  //       alert('ServiceCategory added sucessfully');

  //       let ref = document.getElementById('cancel'); //this is to close the modal form automatically
  //       ref?.click();

  //       this.formValue.reset(); //this is to reset the form after logging in
  //       this.getAllServiceCategory();
  //     },
  //  err   (err: any) => {
  //       alert('something went wrong');
  //     }
  //   );
  }

  getAllServiceCategory() {
    this.adminApi.getServiceCategory().subscribe((res: any) => {
      this.serviceData = res;
    });
  }

  deleteServiceCategory(row: any) {
    this.adminApi.deleteServiceCategory(row.name).subscribe((res) => {
      console.log(res);
      
      alert('service category deleted');
      this.getAllServiceCategory(); //this is to automatically refresh the page
    });
    console.log(row);
    
  }

  // to alto fill the form button after clicking on the edit button
  onEdit(row: any) {
    this.showAddService = false;
    this.showUpdate = true;

    this.servicecategoryModelObj.name = row.name;

    console.log(this.servicecategoryModelObj.name );
    

    this.formValue.controls['name'].setValue(row.name);
    
  }



  updateServiceCategory() {
    this.servicecategoryModelObj.name = this.formValue.value.name;
    
console.log();

    this.adminApi
      .updateServiceCategory(this.servicecategoryModelObj, this.servicecategoryModelObj.name)
      .subscribe((res: any) => {
        console.log(res);
        alert('ServiceCategory updated sucessfully');

        let ref = document.getElementById('cancel'); //this is to close the modal form automatically
        ref?.click();

        this.formValue.reset(); //this is to reset the form after logging in
        this.getAllServiceCategory() //this is to refresh and get the resent data
      });
  }
  

  clickAddServiceCategory(){
this.formValue.reset();
this.showAddService = true;
this.showUpdate = false;
  }
}
