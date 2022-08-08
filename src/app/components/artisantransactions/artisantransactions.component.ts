import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { userProfileModel } from '../userprofile/userprofile.model';

@Component({
  selector: 'app-artisantransactions',
  templateUrl: './artisantransactions.component.html',
  styleUrls: ['./artisantransactions.component.css']
})
export class ArtisantransactionsComponent implements OnInit {
  userprofileModelObj: userProfileModel = new userProfileModel();
  accept: boolean = false;
  // isAprove: boolean = false;
  process: boolean = false;
  // orderId: string = '';
  signupForm!: FormGroup;
  service = 'completed';
  othersData: any;
  check!:any

  totalRecord: any;
  page: number = 1;
  length = 10;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  AllOrderData: any;
  constructor(
    private adminApi: AdminService,
    public api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllOrder();

    this.signupForm = this.formBuilder.group({
      orderId: 0,
    });
  }
  clickEvent() {
    this.accept = !this.accept;
  }
  onEdit(row: any) {
    console.log(row.id);
    this.check = row
    this.userprofileModelObj.orderId = row.id;
    this.userprofileModelObj.firstName = row.firstName;
    this.userprofileModelObj.lastName = row.lastName;
    this.userprofileModelObj.propertyAddress = row.propertyAddress;
    this.userprofileModelObj.city = row.city;
    this.userprofileModelObj.state = row.state;
    this.userprofileModelObj.phoneNumber = row.PhoneNumber;
    this.userprofileModelObj.artisanId = row.artisanId;
    console.log(this.userprofileModelObj.orderId );
    // this.userprofileModelObjorderId.setValue(row.id);
    
    // this.updateOrder.controls['artisanId'].setValue(row.artisanId);
    // this.updateOrder.controls['orderId'].setValue(row.id);
 
  }


  getAllOrder() {
    this.api.getArtisanOrder().subscribe((res: any) => {
      this.AllOrderData = res;
      console.log(this.AllOrderData);
      
    });
  }

}
