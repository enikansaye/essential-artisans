import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

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
  orderForm!: FormGroup;
  reassignForm!: FormGroup;
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
  canceledOrder: any;
  canceledOrderLength: any;
  assignArtisan: any;
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  AllOrderData: any;
  constructor(
    private adminApi: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAllOrder();
    this.pendingOrder();
    this.getAllCompletedOrder();
    this.getAllCanceledOrder();
    

    this.orderForm = this.formBuilder.group({
      orderId: 0,

    });
    this.reassignForm = this.formBuilder.group({
      orderId: 0,
      artisanId:0

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
      return this.AllOrderData.reverse();
    });
  }

  aproveOrder(row: any) {
    console.log(row.id);
    console.log(row);
    
    this.orderForm.value.orderId = row.id;

    this.adminApi
      .aproveOrderUrl(this.orderForm.value)
      .subscribe((res: any) => {
              this.toastr.success('Order Approve Successfully!!');

        console.log(res);
        this.getAllOrder()
      });

    console.log(row);
  }


  rejectOrder(row: any) {
    console.log(row.id);
    this.orderForm.value.orderId = row.id;

    this.adminApi
      .rejectOrderUrl(this.orderForm.value)
      .subscribe((res: any) => {
        
        // console.log(this.reject);
        this.toastr.success('Order Rejected!!');

        console.log(res);
        this.getAllOrder()
        
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
getAllCanceledOrder(){
  this.adminApi.getCanceledOrder().subscribe((data:any)=>{
    this.canceledOrder =data
    this.canceledOrderLength =data.length
    console.log("all canceled data", data);
    
  })
}
hope:any
hope2:any
getArtisanToReassign(data:any){
  console.log(data);
  this.hope=data
  
  this.orderForm.value.orderId = data.id;
  this.adminApi.reassignArtisan1(this.orderForm.value, data.id).subscribe((data:any)=>{
    this.assignArtisan =data
    console.log(this.hope );
    this.hope2 = data
    console.log(this.hope2);
    
    // this.completedOrderLength =data.length
    console.log("all ARTISAN to re-assign data", data);
    
  })
}
hope3:any
onChangeArtisan(event:any){
  console.log(`ID is: ${event.value}`);
  this.hope3 = `${event.value}`
  console.log(this.hope3);
  
  

}

reassignArtisan(data:any){

  data=this.hope2
  console.log(data.name);
  
  
  this.reassignForm.value.orderId = this.hope.id
  this.reassignForm.value.artisanId = this.hope3
  console.log(this.hope2.id);
  
  this.adminApi.reassignArtisan2(this.reassignForm.value).subscribe((data:any)=>{
  
    console.log("this is from reassign");
  
  })
}
 
}
