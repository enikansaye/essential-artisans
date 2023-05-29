import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';

class itemObject {
  itemName!: string;
  price!: number;
  quantity!: number;
  total!: number;
}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
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
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  approveForm!: FormGroup;
  getInvoiceByIdForm!: FormGroup;
  invoiceForm!: FormGroup;
  viewQoute: any;
  pendingQuote: any;
  viewPendingQoute: any;
  quotePendingError: any;
  artisanCharge: any;
  inspectionFee: any;
  isEditMode: boolean = false;
  totalLength: any;
  allTotal: any;
  totalSales: any;
  searchText:any
  totalRecord: any;
  page: number = 1;
  expression = 'completed';
  serviceItemsDetailsiId: any;
  jobDescription: any;
  discountedPrice: any;
  Action: any;
  discountPercentage: any;
  message: any;

  constructor(
    private api: ApiService,
    private adminApi: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.approveForm = this.formBuilder.group({
      invoiceId: 0,
    });
    this.getInvoiceByIdForm = this.formBuilder.group({
      invoiceId: 0,
      // userId: 0,
    });
  }
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



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      id: 1,
      class: 'modal-lg',
    });
  }
}
