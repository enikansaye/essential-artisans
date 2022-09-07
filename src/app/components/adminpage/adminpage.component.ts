import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { PageEvent } from '@angular/material/paginator';
import { ThemeOption } from 'ngx-echarts';
import { CoolTheme } from './cool-theme';
import { EChartsOption } from 'echarts';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  InvoiceObject={
  
    serviceItems:[
      {
        description:'',
        quantity:'',
        unitPrice:'',
       
        totalAmount:'',
        total:'',
        serviceItemId: 0,
      
       
      }
    ],
    invoiceId:0
    
  }

  userData: any;

  // ngx-chart
  options: any;
  chartOption: any;

  expression = 'page1';
  service = 'completed';
  totalRecord: any;
  page: number = 1;
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

  constructor(
    private observer: BreakpointObserver,
    private api: ApiService,
    private adminApi: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.invoiceForm = this.formBuilder.group({
      invoiceId:0,      
      serviceItems: this.formBuilder.array([this.initRows()])
    });
    this.formControls = this.invoiceForm.controls;

    this.invoiceForm.disable();

    this.getAllUser();
    this.getAllArtisan();
    this.getAllPendingArtisan();

    this.getQouteByAdmin();
    this.getAllPendingQuote();
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
          'rose1',
          'rose2',
          'rose3',
          'rose4',
          'rose5',
          'rose6',
          'rose7',
          'rose8',
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
  get formArr() {
    return this.invoiceForm.get("serviceItems") as FormArray;

  }

  initRows() {

    return this.formBuilder.group({
      invoiceId: 0,
      description: [""],
      price:[''],
      quantity:[''],
      total:[]
    });
  }

  // consuming api section
  // getAllUser() {
  //   this.api.getUser().subscribe((res: any) => {
  //     this.userData = res;
  //     console.log(this.userData)
  //     console.log(res)
  //   });
  // }
  // getAllArtisan() {
  //   this.api.getArtisan().subscribe((res: any) => {
  //     this.userData = res;
  //   });
  // }

  getAllUser() {
    this.adminApi.getUser().subscribe((res: any) => {
      this.userData = res;

      console.log(this.userData);
      this.totalRecord = res.length;
      this.userLength = res.length;
      console.log(this.totalRecord);
    });
  }
  getAllArtisan() {
    this.adminApi.getArtisan().subscribe((res: any) => {
      this.artisanData = res;
      console.log(this.artisanData);
      this.totalRecord = res.length;
      this.artisanLength = res.length;
      console.log(this.totalRecord);
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
  getAllOthers() {
    // this.adminApi.getOthers().subscribe((res: any) => {
    //   this.othersData = res;
    //   console.log(this.othersData)
    // });
  }

  deleteArtisan(id: number) {
    // this.adminApi.deleteArtisan(id).subscribe((res:any)=>{
    //   alert('artisan deleted')
    //  this.getAllArtisan();
    // })
  }

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
    this.adminApi.getPendingQuote().subscribe((res: any) => {
      console.log(res);
      this.viewQoute = res;
      return this.viewQoute;
    });
  }

  approveQoute(row: any) {
    console.log(row.invoiceId);
    this.approveForm.value.invoiceId = row.invoiceId;
    console.log(row);

    this.adminApi
      .aproveQuoteUrl(this.approveForm.value, row.invoiceId)
      .subscribe((res: any) => {
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
        // this.isAprove = !this.isAprove;
        console.log(res);
        // this.getQouteByAdmin()
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

this.serviceItemsDetails = this.getInvoiceId.serviceItems.price
       console.log(this.serviceItemsDetails);
       
       this.invoiceUserDetails =this.getInvoiceId.customerInfo
      console.log(data);
      console.log(this.getInvoiceId.action );

    });

  }
  onEditForm(): void {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.invoiceForm.enable();
      // this.formControls['firstName'].enable();

      
    }
  }
 
  submitEditedQuote(data:any){
    
    console.log(data);
    this.invoiceForm.value.invoiceId  =  this.getInvoiceId.invoiceId
    this.invoiceForm.value.serviceOrderId  = this.getInvoiceId.serviceOrderId 
    
    this.adminApi.editQuoteUrl(this.invoiceForm.value).subscribe((data: any[]) => {

      // this.dateCommoditie = this.granosHistorical.data.date
      this.getInvoiceId = data;
      
      console.log(data);
      console.log(this.getInvoiceId.action );

    });

  }

}
