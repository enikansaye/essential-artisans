import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/service/api.service';
import { ArtisansService } from 'src/app/service/artisans.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  value: any;
  getInvoice: any;
  filteredQuoteData: any;
  invoiceId: number = 0;
  cancelQuote: any;
  getInvoiceId: any;
  getInvoiceByIdForm !: FormGroup;
  artisanName: any;
  artisanEmail: any;
  artisanProfession: any;
  artisanPhoneNumber: any;
  userName: any;
  userEmail: any;
  userPhoneNumber: any;
  accountName: any;
  accountNumber: any;
  bankName: any;
  serviceItemsDetails: any;
  invoiceUserDetails: any;
  approveQuote: any;
  serviceItemsDescription: any;
  allTotal: any;
  invoiceAction: any;
  artisanCharge: any;
  jobDescription : any
  isFirstTimeCustomer: any;
  discountPercentage: any;
  discountedPrice: any;
  hasDiscount: any;
  discount: any;
  searchText: any;
  inspectionFee: any;
  modalRef?: BsModalRef;
  fromDate1 = '';
  toDate1 = '';
  submitted : boolean = false;
  page: number = 1; //pagination
  errorData : any
  modalRef2?: BsModalRef<unknown>;
  addMoneyForm !: FormGroup;
  errorMessage : any
  AllQuoteData : any;

  // sort(key: any) {
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }
  constructor(
    private artisanApi : ArtisansService,
    private modalService : BsModalService,
    private formBuilder : FormBuilder,
    private AdminApi: ApiService,
    public api: ApiService,

  ) { }

  ngOnInit(): void {
    this.getAllQuote();
    // this.getInvoiceByIdForm = this.formBuilder.group({
    //   invoiceId: 0,
    //   // userId: 0,
    // });
  }
//   getAllQuote(){
// this.artisanApi.artisanGetAllInvoices().subscribe(res => {
//   console.log(res);
//   this.AllQuoteData = res
  
  
// })
// }
getAllQuote() {
  this.artisanApi.artisanGetAllInvoices().subscribe((data: any) => {
    console.log(data);
    
    this.AllQuoteData = data;

    this.filteredQuoteData = [...this.AllQuoteData];
    console.log(this.filteredQuoteData );
    
    return this.filteredQuoteData.reverse();
  });
}
getQoute() {
  this.api.userGetInvoice().subscribe((data: any) => {
    console.log(data);
    
    this.getInvoice = data;

    this.filteredQuoteData = [...this.getInvoice];
    return this.filteredQuoteData.reverse();
  });
}
onClickInvoce(data: any) {
  (this.invoiceId = data.invoiceId), (this.getInvoiceId = data);

  this.api
    .getInvoiveById(this.getInvoiceByIdForm.value, data.invoiceId)
    .subscribe((data: any) => {
      this.getInvoiceId = data;
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
      this.jobDescription = this.getInvoiceId.jobDescription;

      this.allTotal = this.getInvoiceId.invoiceTotal;
      this.artisanCharge = this.getInvoiceId.artisanCharge;
      this.serviceItemsDescription = this.getInvoiceId.description;
      this.serviceItemsDetails = this.getInvoiceId.serviceItems;
console.log(this.serviceItemsDetails);

      this.invoiceUserDetails = this.getInvoiceId.customerInfo;

      this.invoiceAction = this.getInvoiceId.action;
      this.inspectionFee = this.getInvoiceId.inspectionFee;
      this.isFirstTimeCustomer = this.getInvoiceId.isFirstTimeCustomer;
      this.discountPercentage = this.getInvoiceId.discountPercentage;
      this.discountedPrice = this.getInvoiceId.discountedPrice;
      this.hasDiscount = this.getInvoiceId.hasDiscount;
      this.discount = this.getInvoiceId.discount;
    });
}
}