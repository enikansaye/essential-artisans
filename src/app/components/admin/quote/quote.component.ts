import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';

// class itemObject {
//   itemName!: string;
//   price!: number;
//   quantity!: number;
//   total!: number;
// }

export interface InvoiceObject {
  personName: string;
  invoiceDate: string;
  invoiceNo: string;
  invoiceTotal: number;
  orderId: number;
  jobDescription: string;
  artisanCharge: number;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  mainProduct: Product;
  suggestedProductOne: Product;
  suggestedProductTwo: Product;
}

export interface Product {
  name: string;
  price: number;
  quantity: number;
  total: number;
  id: number;
  marketPlaceProductId: number;
  model: number;
  type: number;
  size: string;
  serviceItemId : number;

}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  hello = [
    {
      invoiceItemId: 0,
      mainServiceItemId: 0,
      mainServiceItemName: '',
      mainServiceItemNewPrice: 0,
      mainServiceItemQuantity: 0,
      suggestedServiceItemOneId: 0,
      suggestedServiceItemOneName: '',
      suggestedServiceItemOneNewPrice: 0,
      suggestedServiceItemOneQuantity: 0,
      suggestedServiceItemTwoId: 0,
      suggestedServiceItemTwoName: '',
      suggestedServiceItemTwoNewPrice: 0,
      suggestedServiceItemTwoQuantity: 0
    }
  ];

  invoiceId = 0;
  artisanCharge = 0;
  discount = 0;
  suggestedProducts: Product[] = [];
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  approveForm!: FormGroup;
  getInvoiceByIdForm!: FormGroup;
  invoiceForm!: FormGroup;
  viewQoute: any;
  pendingQuote: any;
  viewPendingQoute: any;
  quotePendingError: any;
  // artisanCharge: any;
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
    this.getQouteByAdmin();
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
  mainProductName : any
  onClickViewInvoce(data: any) {
    console.log(data);

    
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
          
          for(let item of this.serviceItemsDetails){
            this.mainProductName = item.mainProduct.name
            


          }
          

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
  // getInvoiceTotalAmount() {
  //   return this.itemsArray.reduce((acc, item) => {
  //     acc += this.updateTotalInItemsArray(item);
  //     this.grandtotal = acc;

  //     return acc;
  //   }, 0);
  // }

  // updateTotalInItemsArray(item: itemObject) {
  //   item.total = item.quantity && item.price ? item.quantity * item.price : 0;
  //   return item.total;
  // }

  submitEditedQuote() {
    
    // data = this.serviceItemsDetails;
    this.serviceItemsDetailsiId = this.serviceItemsDetails.serviceItemId;

    let index = this.serviceItemsDetails.findIndex((x: any) => { });

    // let itemsDto = [];

    for (let index = 0; index < this.serviceItemsDetails.length; index++) {
      this.hello.push(this.serviceItemsDetails[index]);
      this.hello = [
        {
          invoiceItemId: this.serviceItemsDetails[index].mainProduct.invoiceItemId,
          mainServiceItemId: this.serviceItemsDetails[index].mainProduct.serviceItemId,
          mainServiceItemName: this.serviceItemsDetails[index].mainProduct.name,
          mainServiceItemNewPrice: this.serviceItemsDetails[index].mainProduct.price,
          mainServiceItemQuantity: this.serviceItemsDetails[index].mainProduct.quantity,
          suggestedServiceItemOneId: this.serviceItemsDetails[index].suggestedProductOne.serviceItemId,
          suggestedServiceItemOneName: this.serviceItemsDetails[index].suggestedProductOne.name,
          suggestedServiceItemOneNewPrice: this.serviceItemsDetails[index].suggestedProductOne.price,
          suggestedServiceItemOneQuantity: this.serviceItemsDetails[index].suggestedProductOne.quantity,
          suggestedServiceItemTwoId: this.serviceItemsDetails[index].suggestedProductTwo.serviceItemId,
          suggestedServiceItemTwoName: this.serviceItemsDetails[index].suggestedProductTwo.name,
          suggestedServiceItemTwoNewPrice: this.serviceItemsDetails[index].suggestedProductTwo.price,
          suggestedServiceItemTwoQuantity: this.serviceItemsDetails[index].suggestedProductTwo.quantity
        }
      ];
    }
   

    let invoiceEdit = {
      invoiceId: this.getInvoiceId.invoiceId,
      artisanCharge: this.artisanCharge,
      invoiceItemsDto: this.hello,
      discount: this.discountPercentage
    };


    // this.InvoiceObject.invoiceId = this.getInvoiceId.invoiceId;
    // this.InvoiceObject.artisanCharge = this.getInvoiceId.artisanCharge;

    const uploadObserver = {
      next: (event: any) => {
        
        this.getInvoiceId = this.serviceItemsDetails;
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
  updateTotalInItemsArray(item: Product) {
    item.total = item.quantity && item.price ? item.quantity * item.price : 0;
    
    return item.total;
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
