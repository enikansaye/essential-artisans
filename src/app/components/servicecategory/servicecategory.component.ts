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
  updateFormValue !: FormGroup;
  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      name: [''],
      
    
    })  
    
    this.updateFormValue = this.formBuilder.group({
     
      oldName:[''],
      newName:['']
    
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
    this.servicecategoryModelObj.oldName = row.name;
    this.servicecategoryModelObj.newName = row.newName;

    console.log(this.servicecategoryModelObj.name );
    

    // this.formValue.controls['oldName'].setValue(row.name);
    
  }


 



  updateServiceCategory(data:any) {
    console.log(data);
    
    this.servicecategoryModelObj.oldName = this.updateFormValue.value.oldName;
    this.servicecategoryModelObj.newName =this.updateFormValue.value.newName;
    
// console.log(data);

    this.adminApi
      .updateServiceCategory(this.updateFormValue.value)
      .subscribe((res: any) => {
        console.log(res);
        alert('ServiceCategory updated sucessfully');

        let ref = document.getElementById('cancel'); //this is to close the modal form automatically
        ref?.click();

        this.formValue.reset(); //this is to reset the form after logging in
        this.getAllServiceCategory() //this is to refresh and get the resent data
      });
  }

  aproveOrder() {
    console.log( this.updateFormValue.value);
   

    this.adminApi
      .updateServiceCategory( this.updateFormValue.value)
      .subscribe((res: any) => {
        // this.isAprove = !this.isAprove;
        console.log(res);
        // this.getAllOrder()
      });

    // console.log(row);
  }

  

  clickAddServiceCategory(){
this.formValue.reset();
this.showAddService = true;
this.showUpdate = false;
  }
}
