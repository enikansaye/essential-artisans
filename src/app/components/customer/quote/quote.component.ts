import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  @ViewChild('modalTemplate') modalTemplate !: TemplateRef<any>;

  hello = [
    {
      invoiceItemId: 0,
      newMainItemId: 0,
      
    }
  ];
  serviceItemsDetailsiId: any
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
  mainProductID: any

  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder,
    // private router: Router,
    // private http: HttpClient,
    public login: LoginService,
    private modalService: BsModalService, //for ngx-bootstrap modal
    private toastr: ToastrService, // private dataApi:DataService
    // public signalRService: SignalrService
  ) { }

  ngOnInit(): void {
    this.getInvoiceByIdForm = this.formBuilder.group({
      invoiceId: 0,
      dateAndTimeOfWhenJobNeedsToBeDone: [''],

      // userId: 0,
    });
    this.addMoneyForm = this.formBuilder.group({
      amount : ['', Validators.required]
    })
    this.getQoute();
  }
  get f(){
    return this.addMoneyForm.controls
  }

  getQoute() {
    this.api.userGetInvoice().subscribe((data: any) => {
      console.log(data);
      
      this.getInvoice = data;

      this.filteredQuoteData = [...this.getInvoice];
      return this.filteredQuoteData.reverse();
    });
  }

   // this get invoice by id
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

  userCancelQuote(data: any) {
    data = this.getInvoiceId;

    this.getInvoiceByIdForm.value.invoiceId = data.invoiceId;
    this.api
      .customerCancelInvoice(this.getInvoiceByIdForm.value, data.invoiceId)
      .subscribe((res: any) => {
        this.modalRef?.hide();

        this.cancelQuote = res;
        this.getQoute();
      });
  }
  get signupFormControl() {
    return this.getInvoiceByIdForm.controls;
  }
  onSelectToggle(data : any){
    console.log(this.serviceItemsDetails);
    for (let index = 0; index < this.serviceItemsDetails.length; index++) {
      this.serviceItemsDetails[index].mainProduct.serviceItemId = data
      this.mainProductID = this.serviceItemsDetails[index].mainProduct.serviceItemId
      console.log(this.mainProductID);
      // this.hello.push(this.serviceItemsDetails[index]);
    }
    
    // console.log(this.serviceItemsDetails.mainProduct.serviceItemId);
    
   
    

  }
  userAprroveQuote(data: any) {
    data = this.getInvoiceId;
    this.submitted = true;
  

    this.getInvoiceByIdForm.value.invoiceId = data.invoiceId;
    
    this.api
      .customerApproveInvoice(this.getInvoiceByIdForm.value)
      .subscribe((res: any) => {
        this.approveQuote = res;
        this.getQoute();

        window.location.href = this.approveQuote.link;
      });
    // this.router.navigate(['https://ravemodal-dev.herokuapp.com/v3/hosted/pay']);
  }
  
  updateInvoice() {
    
    // data = this.serviceItemsDetails;
    this.serviceItemsDetailsiId = this.serviceItemsDetails.serviceItemId;
    console.log(this.serviceItemsDetailsiId);
    

    let index = this.serviceItemsDetails.findIndex((x: any) => {console.log(x);
    });

    // let itemsDto = [];

    for (let index = 0; index < this.serviceItemsDetails.length; index++) {
      this.hello.push(this.serviceItemsDetails[index]);
      this.hello = [
        {
          invoiceItemId: this.serviceItemsDetails[index].mainProduct.invoiceItemId,
          newMainItemId: this.mainProductID
        }
      ];
    }
   

    let invoiceEdit = {
      editInvoiceItemIds: this.hello,
      
    };
console.log(invoiceEdit);
console.log(this.hello);

    // this.InvoiceObject.invoiceId = this.getInvoiceId.invoiceId;
    // this.InvoiceObject.artisanCharge = this.getInvoiceId.artisanCharge;

    const uploadObserver = {
      next: (event: any) => {
        
        this.getInvoiceId = this.serviceItemsDetails;
        this.toastr.success('Quote Successfully Updated');
  
        this.getQoute();
  
        this.modalRef?.hide();

      },
      error: (err: any) => {
        console.log(err);
        
        
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
          this.toastr.warning(this.errorMessage);

        } else {
          // this.errorMessage = 'Could not upload the file!';
          this.toastr.warning(this.errorMessage);

        }
      },
    };

    this.api.userUpdateInvoice(invoiceEdit).subscribe(uploadObserver);
  }
  getAprovedInvoice() {
    this.api.userGetApprovedInvoice().subscribe((data: any) => {});
  }

  debitWallet(data : any){
    data = this.getInvoiceId;
    this.submitted = true;
    this.getInvoiceByIdForm.value.invoiceId = data.invoiceId;

const debitObserver = {
  next : (res : any) => {
    console.log(res);
    this.toastr.success(res.message);
    this.modalRef?.hide()
    

  },
  error : (err : any) => {
console.log(err);
this.toastr.warning(err.error)

if(err.error === "Insufficient wallet balance"){
  this.errorData = err.error
  this.toastr.warning(err.error)

  
}

  }
}
  this.api.debitWallet(this.getInvoiceByIdForm.value).subscribe(debitObserver) 
  }
  
  
  quoteSearch(event: any) {
    if (this.value == '') {
      // this.getOrder();
    } else {
      this.filteredQuoteData = this.filteredQuoteData.filter((res: any) => {
        return res.issue
          .toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
    // return this.hope;
  }

  filterByDate2() {
    let k = 0;
    var ivTemp = this.getInvoice;

    this.filteredQuoteData = [...this.getInvoice];

    if (this.filteredQuoteData! == '') {
      ivTemp = this.filteredQuoteData;
    }

    const isInRange = (element: any) => {
      const fDate = new Date(this.fromDate1);
      const tDate = new Date(this.toDate1);
      const elementFDate = new Date(element['date']);

      return elementFDate > fDate && elementFDate < tDate;
    };
    const result = Object.values(ivTemp).filter(isInRange);
    return (this.filteredQuoteData = result);
  }
 

  onSubmit(data : any){
    this.submitted = true
    const formObserver = {
      next : (res : any) => {
console.log(res);
        // this.router.navigateByUrl(res.data.link)
        window.location.href = res.data.link;
},
      error : (err : any) => {
console.log(err);

      }
    }
    this.api.creditWallet(data).subscribe(formObserver)

  }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

    // this.modalRef = null;
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {
      id: 2,
      class: 'second',
    });
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
  }

  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    // this.modalRef = null;
  }
  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }
}
