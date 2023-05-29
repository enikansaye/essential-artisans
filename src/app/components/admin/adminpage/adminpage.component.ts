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
  itemName!: string;
  price!: number;
  quantity!: number;
  total!: number;
}
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  itemObject = new itemObject();
  itemsArray: Array<itemObject> = [
    {
      itemName: '',
      price: 0,
      quantity: 0,
      total: 0,
    },
  ];
  InvoiceObject = {
    personName: '',
    invoiceDate: '',
    invoiceNo: '',
    invoiceTotal: 0,
    orderId: 0,
    invoiceId: 0,
    jobDescription: '',
    artisanCharge: 0,
    serviceItemsDto: (this.itemsArray = []),
  };

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
  message: any;
  discountedPrice: any;
  discountPercentage: any;
  searchText:any
quotePage: any;

  constructor(
    private observer: BreakpointObserver,
    private api: ApiService,
    private adminApi: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    public signalRService: SignalrService
  ) {}

  ngOnInit(): void {
    // this.invoiceForm = this.formBuilder.group({
    //   invoiceId:0,
    //   serviceItemsDto: this.formBuilder.array([this.initRows()])
    // });
    // this.formControls = this.invoiceForm.controls;

    // this.invoiceForm.disable();

    // this.getAllUser();
    // this.getAllPendingArtisan();

    // this.getQouteByAdmin();
    // this.getAllPendingQuote();
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

  // ngAfterViewInit() {
  //   this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
  //     if (res.matches) {
  //       this.sidenav.mode = 'over';
  //       this.sidenav.close();
  //     } else {
  //       this.sidenav.mode = 'side';
  //       this.sidenav.open();
  //     }
  //   });
  // }

 
 

  getQouteByAdmin() {
    this.adminApi.getQoute().subscribe((res: any) => {
      
      
      this.viewQoute = res;
      return this.viewQoute.reverse();
    });
  }

  getAllPendingQuote() {
    const registerObserver = {
      next: (res: any) => {
        this.viewPendingQoute = res;
        return this.viewPendingQoute;
      },
      error: (err: any) => {
        return (this.quotePendingError = err.error);
      },
    };

    this.adminApi.getPendingQuote().subscribe(registerObserver);
  }

  approveQoute(row: any) {
    this.approveForm.value.invoiceId = row.invoiceId;

    this.adminApi
      .aproveQuoteUrl(this.approveForm.value, row.invoiceId)
      .subscribe((res: any) => {
        this.getQouteByAdmin();

        this.toastr.success('invoice Approved' );
      });
  }
 
  getInvoiceId: any;
  invoiceName: any;
  artisanName: any;
  artisanPhoneNumber: any;
  artisanProfession: any;
  artisanEmail: any;
  userName: any;
  userEmail: any;
  userPhoneNumber: any;
  invoiceUserDetails: any;
  serviceItemsDetails: any;
  accountName: any;
  accountNumber: any;
  bankName: any;
  onClickViewInvoce(data: any) {
    (this.getInvoiceByIdForm.value.invoiceId = data.invoiceId),
      this.api
        .getInvoiveById(this.getInvoiceByIdForm.value, data.invoiceId)
        .subscribe((data: any[]) => {
          
          this.getInvoiceByIdForm.disable();
          this.getInvoiceId = data;
          // artisan
          this.artisanName = this.getInvoiceId.artisanInfo.name;
          this.artisanEmail = this.getInvoiceId.artisanInfo.email;
          this.artisanProfession = this.getInvoiceId.artisanInfo.profession;
          this.artisanPhoneNumber = this.getInvoiceId.artisanInfo.phoneNumber;

          //  user
          this.userName = this.getInvoiceId.customerInfo.name;
          this.userEmail = this.getInvoiceId.customerInfo.email;
          this.userPhoneNumber = this.getInvoiceId.customerInfo.phoneNumber;

          this.accountName = this.getInvoiceId.accountName;
          this.accountNumber = this.getInvoiceId.accountNumber;
          this.bankName = this.getInvoiceId.bankName;

          this.inspectionFee = this.getInvoiceId.inspectionFee;
          this.artisanCharge = this.getInvoiceId.artisanCharge;
          this.jobDescription = this.getInvoiceId.jobDescription;
          this.allTotal = this.getInvoiceId.invoiceTotal;
          this.serviceItemsDetails = this.getInvoiceId.serviceItems;

          this.invoiceUserDetails = this.getInvoiceId.customerInfo;
          this.Action = this.getInvoiceId.action;
          this.discountedPrice = this.getInvoiceId.discountedPrice
          this.discountPercentage = this.getInvoiceId.discountPercentage

          return this.getInvoiceId;
        });
  }
  onEditForm(): void {
    this.isEditMode = true;
  }
  grandtotal: number = 0;
  getInvoiceTotalAmount() {
    return this.itemsArray.reduce((acc, item) => {
      acc += this.updateTotalInItemsArray(item);
      this.grandtotal = acc;

      return acc;
    }, 0);
  }

  updateTotalInItemsArray(item: itemObject) {
    item.total = item.quantity && item.price ? item.quantity * item.price : 0;
    return item.total;
  }

  submitEditedQuote(data: any) {
    
    data = this.serviceItemsDetails;
    this.serviceItemsDetailsiId = this.serviceItemsDetails.serviceItemId;

    let index = this.serviceItemsDetails.findIndex((x: any) => {});

    let itemsDto = [];

    for (let index = 0; index < data.length; index++) {
      itemsDto.push(data[index]);
    }

    let invoiceEdit = {
      invoiceId: this.getInvoiceId.invoiceId,
      artisanCharge: this.artisanCharge,
      serviceItemsDto: itemsDto,
      discount: this.discountPercentage
    };

    this.InvoiceObject.invoiceId = this.getInvoiceId.invoiceId;
    this.InvoiceObject.artisanCharge = this.getInvoiceId.artisanCharge;

    const uploadObserver = {
      next: (event: any) => {
        
        this.getInvoiceId = data;
        this.toastr.success('Quote Successfully Updated');
  
        this.getQouteByAdmin();
  
        this.modalRef?.hide();

      },
      error: (err: any) => {
        
        if (err.error && err.error.message) {
          this.message = err.error.message;
          this.toastr.warning(this.message);

        } else {
          // this.message = 'Could not upload the file!';
          this.toastr.warning(this.message);

        }
      },
    };

    this.adminApi.editQuoteUrl(invoiceEdit).subscribe(uploadObserver);
  }
 

  confirmPayment(row: any) {
    this.approveForm.value.invoiceId = row.invoiceId;

    this.adminApi
      .confirmPaymentUrl(this.approveForm.value, row.invoiceId)
      .subscribe((res: any) => {});
  }

  getAllOrder() {
    this.adminApi.getOrder().subscribe((res: any) => {
      this.order = res;
      // this.totalLength = res.length;
    });
  }
  getAllTotalSales() {
    this.adminApi.getTotalSales().subscribe((res: any) => {
      this.totalSales = res;
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

 
 
  onclickNotification(data: any) {
    let i = 0;
    let input = {
      notificationId: data,
    };
    this.api.readNotification(input).subscribe((res: any) => {
      this.toastr.success('You read this message');

      this.signalRService.getNotification();
    });
  }
}
