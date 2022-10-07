import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css'],
  providers: [DatePipe],
})
export class AlltransactionsComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(null),
  });

  Operations!: any[] // set this however you did before.
  filteredOperations: any[] = [];


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
  cancelPage: number = 1;
  completePage: number = 1;
  pendingPage: number = 1;
  allPage: number = 1;
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
  value!: '';
  modalRef?: BsModalRef;
  orderById: any;
  rating4: number = 0;
  filteredOrderData: any;
  fromDate1: any;
  toDate1: any;
  hidden2: boolean = false;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  AllOrderData: any;
  constructor(
    private adminApi: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,public datepipe: DatePipe,
    private modalService: BsModalService,//for ngx-bootstrap modal

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
      // return this.AllOrderData.reverse();

      this.filteredOrderData = [...this.AllOrderData]
      return this.filteredOrderData.reverse();
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
Search(event:any) {
  if (this.value == '') {
    console.log(this.value);
    
    this.getAllOrder();
  } else {
    this.AllOrderData = this.AllOrderData.filter((res: any) => {
      console.log(res);
      
      return res.issue.toLocaleLowerCase()
        .match(this.value.toLocaleLowerCase());
    });
  }
// return this.hope;
}
Search2(event:any) {
  if (this.value == '') {
    console.log(this.value);
    
    this.getAllOrder();
  } else {
    this.AllOrderData = this.AllOrderData.filter((res: any) => {
      console.log(res);
      
      return res.issue.toLocaleLowerCase()
        .match(this.value.toLocaleLowerCase());
    });
  }
// return this.hope;
}

onClickVieworder(data:any){
  console.log(data);
  this.orderForm.value.invoiceId = data.id,
  
  
  this.adminApi.getOrderById(this.orderForm.value ,data.id).subscribe((data: any) => {
    this.orderById = data
    this.rating4 = data.artisanRating;

    console.log(data);
    

})
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
start_date = new Date('YYYY-MM-DD')
end_date = new Date
public daterange: any = {};

public options: any = {
  locale: { format: 'YYYY-MM-DD' },
  alwaysShowCalendars: false,
};

public selectedDate(value: any, datepicker?: any) {
  // this is the date  selected
  console.log(value);
  console.log(datepicker);
  

  // any object can be passed to the selected event and it will be passed back here
  // datepicker.start = this.range.value.start;
  // datepicker.end = this.range.value.end;

  // // use passed valuable to update state
  // this.range.value.start = datepicker.start;
  // this.range.value.end = datepicker.end;
  // this.daterange.label = value.label;
  // console.log(this.range.value.start);
  // console.log(this.range.value.end);

  if (this.range.value == '') {
    console.log(this.value);
    
    this.getAllOrder();
  } else {
    // this.AllOrderData = this.AllOrderData.filter((res: any) => {
    //   console.log(res);
      
    this.AllOrderData = this.AllOrderData.filter((e:any)=> {
      let latest_date =this.datepipe.transform(this.start_date, 'fullDate');
console.log(latest_date );

    const  data= e.date ===  latest_date 
    console.log(this.start_date);
    
    console.log(data);
    console.log(e.date);
     return e.date
    .match(this.start_date?.toString)
    
    });
// console.log(this.AllOrderData);

      // return res.date.toLocaleLowerCase()
      //   .match(this.range.value.toLocaleLowerCase());
    // });
  }
  
}
filterByDate(){
  let k = 0
  var ivTemp = this.AllOrderData
 
  this.filteredOrderData = [...this.AllOrderData];

  if(this.filteredOrderData! == ''){
    ivTemp = this.filteredOrderData
  }
  console.log(ivTemp.length);
  
  console.log(this.fromDate1, this.toDate1);

  const isInRange = (element: any) => { 
    const fDate = new Date(this.fromDate1);
    const tDate = new Date(this.toDate1);
    const elementFDate = new Date(element['date']);

    return (elementFDate > fDate && elementFDate < tDate);
  }
  const result = Object.values(ivTemp).filter(isInRange);
  return this.filteredOrderData =result
  
}


 hidden:boolean = false;

imageSource(){
    this.hidden = !this.hidden;
}
imageSource2(){
    this.hidden2 = !this.hidden2;
}
}

