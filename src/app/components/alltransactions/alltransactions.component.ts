import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css'],
})
export class AlltransactionsComponent implements OnInit {
  accept: boolean = false;
  // isAprove: boolean = false;
  process: boolean = false;
  // orderId: string = '';
  signupForm!: FormGroup;
  service = 'completed';
  othersData: any;
  totalLength: any;

  totalRecord: any;
  page: number = 1;
  length = 10;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  pending: any;
  pendingOrderError: any;
  pendingLength: any;
  completedOrder: any;
  completedOrderLength: any;
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  AllOrderData: any;
  constructor(
    private adminApi: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllOrder();
    this.pendingOrder();
    this.getAllCompletedOrder();
    

    this.signupForm = this.formBuilder.group({
      orderId: 0,

    });
  }
  clickEvent() {
    this.accept = !this.accept;
  }

  getAllOrder() {
    this.adminApi.getOrder().subscribe((res: any) => {
      console.log(res);
      this.totalLength = res.length;
      this.AllOrderData = res;
      console.log(this.AllOrderData);
    });
  }

  aproveOrder(row: any) {
    console.log(row.id);
    console.log(row);
    
    this.signupForm.value.orderId = row.id;

    this.adminApi
      .aproveOrderUrl(this.signupForm.value)
      .subscribe((res: any) => {
        // this.isAprove = !this.isAprove;
        console.log(res);
        this.getAllOrder()
      });

    console.log(row);
  }


  rejectOrder(row: any) {
    console.log(row.id);
    this.signupForm.value.orderId = row.id;

    this.adminApi
      .rejectOrderUrl(this.signupForm.value)
      .subscribe((res: any) => {
        
        // console.log(this.reject);
        
        console.log(res);
        // this.getAllOrder()
      });

    console.log(row);
  }
pendingOrder(){
  const registerObserver = {
    next: (res: any) => {
      console.log(res);
      this.pending =res
      this.pendingLength =res.length
      
      console.log('this is for pending order',this.pending);
    },
    error: (err: any) => {
      console.log(err.error);
      return this.pendingOrderError =err.error

     
    },
  };

  return this.adminApi.getPendingOrder().subscribe(registerObserver)
  
}

getAllCompletedOrder(){
  this.adminApi.getCompletedOrder().subscribe((data:any)=>{
    this.completedOrder =data
    this.completedOrderLength =data.length
    console.log("all completed data", data);
    
  })
}
 
}
