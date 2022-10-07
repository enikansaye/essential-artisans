import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PageEvent } from '@angular/material/paginator';
import { ThemeOption } from 'ngx-echarts';
import { CoolTheme } from './cool-theme';
import { EChartsOption } from 'echarts';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SignalrService } from 'src/app/service/signalr.service';


class itemObject {
  itemName!:string;
  price!:number;
  quantity!:number;
  total!:number;
  

}
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})


export class AdminpageComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  itemObject=new itemObject()
  itemsArray:Array<itemObject>=[
    {
      itemName:"",
      price:0,
      quantity:0,
      total:0
  
    }
  ]
  InvoiceObject={
    personName:"",
    invoiceDate:"",
    invoiceNo:"",
    invoiceTotal:0,
    orderId:0,
    invoiceId:0,
    jobDescription:'',
    artisanCharge:0,
    serviceItemsDto: this.itemsArray =[]
  }

  userData: any;

  // ngx-chart
  options: any;
  chartOption: any;

  expression = 'page1';
  service = 'completed';
  totalRecord: any;
  page: number = 1;
  userPage: number = 1;
  artisanPage: number = 1;
  artisanData: any;
  othersData: any;
  AllOrderData: any;
  artisanLength: any;
  userLength: any;
  viewQoute: any;
  pendingQuote: any;
  pendingArtisans: any;
  pendingArtisanRecord: any;
  approveForm!: FormGroup;
  getInvoiceByIdForm!: FormGroup;
  invoiceForm!: FormGroup;
  formControls: any;
  artisanErrorMessage: any;
  quoteErrorMessage: any;
  artisanId: number = 0;
  isEditMode: boolean = false;
  totalLength: any;
  allTotal: any;
  totalSales: any;
  viewPendingQoute: any;
  quotePendingError: any;
  serviceItemsDetailsiId: any;
  jobDescription: any;
  artisanCharge: any;
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  inspectionFee: any;
  Action: any;
  value!: '';
value2: any;
  hope3: any;
  order: any;

  constructor(
    private observer: BreakpointObserver,
    private api: ApiService,
    private adminApi: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    public signalRService: SignalrService,



  ) {}

  ngOnInit(): void {

    // this.invoiceForm = this.formBuilder.group({
    //   invoiceId:0,      
    //   serviceItemsDto: this.formBuilder.array([this.initRows()])
    // });
    // this.formControls = this.invoiceForm.controls;

    // this.invoiceForm.disable();

    this.getAllUser();
    this.getAllArtisan();
    this.getAllPendingArtisan();

    this.getQouteByAdmin();
    this.getAllPendingQuote();
    this.getAllOrder();
    this.getAllTotalSales();
    // this.getAllCompletedOrder();

    // this.getAllUser()

    this.approveForm = this.formBuilder.group({
      invoiceId: 0,
    });
    this.getInvoiceByIdForm = this.formBuilder.group({
      invoiceId: 0,
      // userId: 0,
      

    });
    // ngx chart
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.chartOption = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };

    this.options = {
      title: {
        text: "Nightingale's Rose Diagram",
        subtext: 'Mocking Data',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: [
          'Artisans',
          'Users',
          'Sales',
          'Orders',
          // '',
          // 'rose6',
          // 'rose7',
          // 'rose8',
        ],
      },
      calculable: true,
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: [
            { value: 10, name: 'rose1' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' },
          ],
        },
      ],
    };
  }

  theme!: string | ThemeOption;
  coolTheme = CoolTheme;

  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  

 

  getAllUser() {
    this.adminApi.getUser().subscribe((res: any) => {
      this.userData = res;

      console.log(this.userData);
      this.totalRecord = res.length;
      this.userLength = res.length;
      console.log(this.totalRecord);
      return this.userData.reverse()
    });
  }
  getAllArtisan() {
    this.adminApi.getArtisan().subscribe((res: any) => {
      this.artisanData = res;
      console.log(this.artisanData);
      this.totalRecord = res.length;
      this.artisanLength = res.length;
      console.log(this.totalRecord);
      return this.artisanData.reverse()
    });
  }
  getAllPendingArtisan() {
    const registerObserver = {
      next: (res: any) => {
        console.log(res);

        this.pendingArtisans = res;
        console.log(this.pendingArtisans);
        this.pendingArtisanRecord = res.length;
      },
      error: (err: any) => {
        console.log(err.error);
        return (this.artisanErrorMessage = err.error);
        // this.alertService.danger('signup failed');
      },
    };
    this.adminApi.getPendingArtisan().subscribe(registerObserver);
  }
  // getAllOthers() {
  //   // this.adminApi.getOthers().subscribe((res: any) => {
  //   //   this.othersData = res;
  //   //   console.log(this.othersData)
  //   // });
  // }

  getArtisanById(id: string) {
    this.adminApi.getArtisanbyid(id).subscribe((res: any) => {
      this.artisanData = res;
    });
  }

  getQouteByAdmin() {
    this.adminApi.getQoute().subscribe((res: any) => {
      console.log(res);
      this.viewQoute = res;
      return this.viewQoute;
    });
  }

  getAllPendingQuote() {

    const registerObserver = {
      next: (res: any) => {
        console.log("this is from pending quote",res);
        this.viewPendingQoute = res;
        return this.viewPendingQoute;
      },
      error: (err: any) => {
        console.log(err.error);
        return this.quotePendingError = err.error;
        // this.alertService.danger('signup failed');
      },
    };

    this.adminApi.getPendingQuote().subscribe(registerObserver)
    
  }

  approveQoute(row: any) {
    console.log(row.invoiceId);
    this.approveForm.value.invoiceId = row.invoiceId;
    console.log(row);

    this.adminApi
      .aproveQuoteUrl(this.approveForm.value, row.invoiceId)
      .subscribe((res: any) => {
        this.getQouteByAdmin();

        this.toastr.success('invoice created successfully')

        // this.isAprove = !this.isAprove;
        console.log(res);
        // this.getQouteByAdmin()
      });

    // console.log(row);
  }
  approveArtisan(row: any) {
    console.log(row.id);
    this.artisanId = row.id;
    console.log(row);

    this.adminApi
      .aproveArtisanUrl(this.artisanId, row.id)
      .subscribe((res: any) => {
        console.log(res);

        this.toastr.success('Artisan Approved')
        this.getAllPendingArtisan()
         this.getAllArtisan() 
         

      });
    this.artisanErrorMessage;
    console.log(row);
  }
  getInvoiceId:any 
  invoiceName: any 
  artisanName:any
  artisanPhoneNumber:any
  artisanProfession:any
  artisanEmail:any
  userName:any
  userEmail:any
  userPhoneNumber:any
  invoiceUserDetails:any
  serviceItemsDetails:any
  accountName:any;
  accountNumber:any;
  bankName:any;
  onClickViewInvoce(data:any){
    console.log(data);
    this.getInvoiceByIdForm.value.invoiceId = data.invoiceId,
    
    
    this.api.getInvoiveById(this.getInvoiceByIdForm.value ,data.invoiceId).subscribe((data: any[]) => {
      this.getInvoiceByIdForm.disable()
      this.getInvoiceId = data;
      // artisan
       this.artisanName =this.getInvoiceId.artisanInfo.name
       this.artisanEmail =this.getInvoiceId.artisanInfo.email
       this.artisanProfession =this.getInvoiceId.artisanInfo.profession
       this.artisanPhoneNumber =this.getInvoiceId.artisanInfo.phoneNumber

      //  user
       this.userName =this.getInvoiceId.customerInfo.name
       this.userEmail =this.getInvoiceId.customerInfo.email
       this.userPhoneNumber =this.getInvoiceId.customerInfo.phoneNumber

       this.accountName = this.getInvoiceId.accountName
       this.accountNumber = this.getInvoiceId.accountNumber
       this.bankName = this.getInvoiceId.bankName

this.inspectionFee = this.getInvoiceId.inspectionFee
this.artisanCharge = this.getInvoiceId.artisanCharge
this.jobDescription = this.getInvoiceId.jobDescription
this.allTotal = this.getInvoiceId.invoiceTotal
this.serviceItemsDetails = this.getInvoiceId.serviceItems
       console.log(this.serviceItemsDetails);
       
       this.invoiceUserDetails =this.getInvoiceId.customerInfo
      console.log(data);
     this.Action =this.getInvoiceId.action ;

      return this.getInvoiceId

    });
    

  }
  onEditForm(): void {
    this.isEditMode = true;
// this.serviceItemsDetails = this.itemsArray
// const control = this.serviceItemsDetails;
// control.controls =[];
//     if (this.isEditMode) {
//       // this.invoiceForm.enable();
//       // this.formControls['firstName'].enable();

      
//     }
  }
  grandtotal:number =0
getInvoiceTotalAmount() {
return this.itemsArray.reduce((acc, item) => {
acc += this.updateTotalInItemsArray(item) 
this.grandtotal =acc;
console.log(this.grandtotal);

return acc;
}, 0)
 
}


updateTotalInItemsArray(item: itemObject) {
item.total =(item.quantity && item.price) ? item.quantity * item.price:0;
return item.total
}
 
  submitEditedQuote(data:any){
    
    data = this.serviceItemsDetails
    console.log(data);
    this.serviceItemsDetailsiId = this.serviceItemsDetails.serviceItemId

    // this.serviceItemsDetailsiId = this.serviceItemsDetails[i]['this.serviceItemsDetails.serviceItemId']
    // this.serviceItemsDetailsiId = data[i]['serviceItemsDetails ']
    console.log(this.serviceItemsDetailsiId);
    let index = this.serviceItemsDetails.findIndex((x:any)=> {

    });
  
    let itemsDto = []

    for (let index = 0; index < data.length; index++) {      
      itemsDto.push(data[index])
    }
    

    let invoiceEdit = {
      "invoiceId": this.getInvoiceId.invoiceId,
      "artisanCharge": "",
      "serviceItemsDto": itemsDto
    } 

    console.log(invoiceEdit);
    
    this.InvoiceObject.invoiceId  =  this.getInvoiceId.invoiceId
    // console.log(this.getInvoiceId.invoiceId);
    
   
    
    
    this.adminApi.editQuoteUrl(invoiceEdit).subscribe((data: any[]) => {
     
      this.getInvoiceId = data;
      this.toastr.success('Quote Successfully Updated')

      this.getQouteByAdmin()

      this.modalRef?.hide()

      console.log(data);
      console.log(this.getInvoiceId.action );

    });

  }
  suspendArtisan(row: any) {
    this.artisanId = row.id;

    const registerObserver = {
      next: (res: any) => {
        this.toastr.success('Artisan Suspended')
        this.getAllArtisan()

        console.log("this is a respond from suspend artisan",res);
      },
      error: (err: any) => {
        this.toastr.warning('Signup failed');

        return this.quotePendingError = err.error;
      },
    };

    this.adminApi
      .suspendArtisanUrl(this.artisanId, row.id)
      .subscribe(registerObserver);
   
  }
  deleteArtisan(row: any) {
    this.artisanId = row.id;
    const registerObserver = {
      next: (res: any) => {
        this.toastr.success('Artisan Deleted')
        this.getAllArtisan()

        console.log("this is a respond from delete artisan", res);
      },
      error: (err: any) => {
        this.toastr.warning('Something went Wrong!!!')

        return this.quotePendingError = err.error;
      },
    };
    this.adminApi
      .deleteArtisanUrl(this.artisanId, row.id)
      .subscribe(registerObserver);
  }

  confirmPayment(row: any) {
    console.log(row.invoiceId );
    this.approveForm.value.invoiceId = row.invoiceId;
    console.log(row);

    this.adminApi
      .confirmPaymentUrl(this.approveForm.value, row.invoiceId)
      .subscribe((res: any) => {
        console.log("this is a respond from confirm payment",res);
      });
    // this.artisanErrorMessage;
    console.log(row);
  }

  getAllOrder() {
    this.adminApi.getOrder().subscribe((res: any) => {
      console.log(res);
      this.order =res
      this.totalLength = res.length;
      // this.AllOrderData = res;
      // console.log(this.AllOrderData);
      // return this.AllOrderData.reverse();
    });
  }
  getAllTotalSales() {
    this.adminApi.getTotalSales().subscribe((res: any) => {
      console.log('this is total sales',res);
      this.totalSales = res;
      // this.AllOrderData = res;
      // console.log(this.AllOrderData);
      // return this.AllOrderData.reverse();
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


  Search(event:any) {
    if (this.value == '') {
      console.log(this.value);
      
      this.getAllArtisan();
    } else {
      this.artisanData = this.artisanData.filter((res: any) => {
        console.log(res);
        
        return res.firstName.toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
  // return this.hope;
  }
  Search2(event:any) {
    if (this.value2 == '') {
      console.log(this.value);
      
      this.getAllUser();
    } else {
      this.userData = this.userData.filter((res: any) => {
        console.log(res);
        
        return res.firstName.toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
  // return this.hope;
  }
  onclickNotification(data:any){
    console.log(data);
    
    let i = 0
    let input ={
      
        notificationId :data
      
    }
    this.api.readNotification(input).subscribe((res:any) =>{
      console.log(res);
      this.toastr.success('You read this message')

this.signalRService.getNotification()
      // this.signalRService.notification
      
    })
    console.log(input. notificationId);
    
  }

 
}