import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { userProfileModel } from '../../customer/userprofile/userprofile.model';
// import {MatDialog,  MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ArtisansService } from 'src/app/service/artisans.service';
import { ToastrService } from 'ngx-toastr';
import { iif } from 'rxjs';

// const htmlToPdfmake = require('html-to-pdfmake');
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

class itemObject {
  name!: string;
  price!: number;
  quantity!: number;
  total!: number;
  id !: number;
  marketPlaceProductId !: number;
  model !: number 
  type !: number
  size !: string
}
class suggestedProductOne {
  name!: string;
  price!: number;
  quantity!: number;
  total!: number;
  id !: number;
  marketPlaceProductId !: number;
  model !: number 
  type !: number
  size !: string
}
class suggestedProductTwo {
  name!: string;
  price!: number;
  quantity!: number;
  total!: number;
  id !: number;
  marketPlaceProductId !: number;
  model !: number 
  type !: number
  size !: string
}


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
}

@Component({
  selector: 'app-artisantransactions',
  templateUrl: './artisantransactions.component.html',
  styleUrls: ['./artisantransactions.component.css'],
})
export class ArtisantransactionsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();

  invoice: InvoiceObject = {
    personName: '',
    invoiceDate: '',
    invoiceNo: '',
    invoiceTotal: 0,
    orderId: 0,
    jobDescription: '',
    artisanCharge: 0,
    items: [],
  };

  itemObject = new itemObject();
  itemsArray: Array<itemObject> = [
    {
      name: '',
      price: 0,
      quantity: 0,
      total: 0,
      id: 0,
      marketPlaceProductId : 0,
  model : 0,
  type : 0,
  size : " "
    },
  ];
  itemsArray1: Array<itemObject> = [
    {
      name: '',
      price: 0,
      quantity: 0,
      total: 0,
      id: 0,
      marketPlaceProductId : 0,
  model : 0,
  type : 0,
  size : " "
    },
  ];
  itemsArray2: Array<itemObject> = [
    {
      name: '',
      price: 0,
      quantity: 0,
      total: 0,
      id: 0,
      marketPlaceProductId : 0,
  model : 0,
  type : 0,
  size : " "
    },
  ];
  InvoiceObject = {
    personName: '',
    invoiceDate: '',
    invoiceNo: '',
    invoiceTotal: 0,
    orderId: 0,
    jobDescription: '',
    artisanCharge: 0,
    items: (this.itemsArray = []),
    suggestedProductOne: (this.itemsArray1 = []),
    suggestedProductTwo: (this.itemsArray2 = []),
  };

  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  userprofileModelObj: userProfileModel = new userProfileModel();
  accept: boolean = false;
  process: boolean = false;
  signupForm!: FormGroup;
  service = 'completed';
  othersData: any;
  check!: any;
  searchText:any

  totalRecord: any;
  page: number = 1;
  completePage: number = 1;
  length = 10;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  totalLength: any;
  serviceOrdeIdForm!: FormGroup;
  myForm !: FormGroup;
  showSecondSelect: boolean = false;
  issue: any; //string for search of data
  p: number = 1; //pagination
  pendingPage: number = 1; //pagination
  completeOrderData: any;
  completeOrderLength: any;
  AllpendingLength: any;
  completeOrderError: any;
  pendingOrderError: any;
  cancelOrderError: any;
  cancelOrderData: any;
  cancelOrderLength: any;
  hope: any;
  orderById: any;
  value: any;
  filteredOrderData: any;
  fromDate1: any;
  toDate1: any;
  message: any;
  message2: any;
  cancelOrder: any;
  orderDate: any;
  orderfiles: any;

  // items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  selectedItem !: string;
  categoryData !: any;
  categoryValue: any;
  productData: any;
  selectedOption : any;
  selectedName : any;
  selectedPrice : any;
  allowInput: boolean = false;
  others : string = "";


  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  AllpendingData: any;
  AllOrderData: any;
  items: any[] = [];
  selectedItemValue: string = '';
  suggestedProducts: Product[] = [];

  constructor(
    private adminApi: AdminService,
    public api: ApiService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private artisanurl: ArtisansService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  assignValueToInput(data : any) {
    this.selectedOption = data.name
    this.selectedPrice = data.price
    
    // for(let data of this.selectedOption){
      
    // }
    
    if (this.selectedOption === '') {
      this.allowInput = true;
    } else {
      this.allowInput = false;
    }
  }
  letsee(data : any){
    
  }

  ngOnInit(): void {
    // this.onEdit(this.check)
    this.getCompletedOrder();
    this.getPendingOrder();
    this.getAllOrder();
    this.getCancelOrder();
    this.artisanGetAllProduct();
    // this.getServiceCategory();

    this.signupForm = this.formBuilder.group({
      orderId: 0,
    });
    this.serviceOrdeIdForm = this.formBuilder.group({
      serviceOrdeId: 0,
    });

    this.artisanurl.getAllProduct().subscribe((res) => {
      this.suggestedProducts = res;
    });
  }
  artisanGetAllProduct(){
    this.artisanurl.getAllProduct().subscribe(res =>{
      
      this.items = res
      this.productData = res
      
    })

  }
  onMainProductSelected(selectedProduct: InvoiceItem, index: number) {
    if (selectedProduct.mainProduct.name === 'other') {
      this.showInput = true;
    } else {
      this.showInput = false;
    }
    
    // selectedProduct.mainProduct.name = this.others

    
    
    // When an item name is selected, find the corresponding product object from suggestedProducts
    const product = this.suggestedProducts.find(p => p.name === selectedProduct.mainProduct.name);

    if (product) {
      
      // If the product is found, update the item properties based on the selected product
      this.invoice.items[index].mainProduct.price = product.price;
      this.invoice.items[index].mainProduct.price = product.price;
      // this.itemsArray[index].quantity = 1; // You can set an initial quantity value if needed
      // this.calculateTotal(index); // Optionally calculate and update the total based on the price and quantity
    }
  }
  showInput: boolean = false;

  // onInputChange(item: any, newValue: number) {
    
  //   item.mainProduct.name = newValue;
  // }
  onSuggestedItem1Selected(selectedProduct: InvoiceItem, index: number) {
    
    // When an item name is selected, find the corresponding product object from suggestedProducts
    const product = this.suggestedProducts.find(p => p.name === selectedProduct.suggestedProductOne.name);

    if (product) {
      
      // If the product is found, update the item properties based on the selected product
      this.invoice.items[index].suggestedProductOne.price = product.price;
      this.invoice.items[index].suggestedProductOne.price = product.price;
      // this.itemsArray[index].quantity = 1; // You can set an initial quantity value if needed
      // this.calculateTotal(index); // Optionally calculate and update the total based on the price and quantity
    }
  }
  onSuggestedItem2Selected(selectedProduct: InvoiceItem, index: number) {
    
    // When an item name is selected, find the corresponding product object from suggestedProducts
    const product = this.suggestedProducts.find(p => p.name === selectedProduct.suggestedProductTwo.name);

    if (product) {
      
      // If the product is found, update the item properties based on the selected product
      this.invoice.items[index].suggestedProductTwo.price = product.price;
      this.invoice.items[index].suggestedProductTwo.price = product.price;
      // this.itemsArray[index].quantity = 1; // You can set an initial quantity value if needed
      // this.calculateTotal(index); // Optionally calculate and update the total based on the price and quantity
    }
  }
  addItem() {
    const newItem: InvoiceItem = {
      mainProduct: {
        name: '',
        price: 0,
        quantity: 0,
        total: 0,
        id: 0,
        marketPlaceProductId: 0,
        model: 0,
        type: 0,
        size: '',
      },
      suggestedProductOne: {
        name: '',
        price: 0,
        quantity: 0,
        total: 0,
        id: 0,
        marketPlaceProductId: 0,
        model: 0,
        type: 0,
        size: '',
      },
      suggestedProductTwo: {
        name: '',
        price: 0,
        quantity: 0,
        total: 0,
        id: 0,
        marketPlaceProductId: 0,
        model: 0,
        type: 0,
        size: '',
      },
    };

    this.invoice.items.push(newItem);
  }

  openDialog() {}

  onEdit(row: any) {
    
    this.modalRef?.hide();
    
    this.InvoiceObject.orderId = row.id;
  }

  getAllOrder() {
    this.artisanurl.getArtisanOrder().subscribe((res: any) => {
      
      this.AllOrderData = res;
      this.totalLength = res.length;

      this.filteredOrderData = [...this.AllOrderData];
      return this.filteredOrderData.reverse();
    });
  }
 

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  // get all service category


  // generate invoice section

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      id: 1,
      class: 'modal-lg',
    });
    this.InvoiceObject.orderId

    
  }

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.closeModal(1)
    

  }
 
  confirm(): void {
    // this.message = 'Confirmed!';
    this.modalRef?.hide();
    
  }
 
  decline(): void {
    // this.message = 'Declined!';
    this.modalRef?.hide();
  }


  getPendingOrder() {
    const registerObserver = {
      next: (res: any) => {
        if(res){
          this.AllpendingData = res;

          this.AllpendingLength = res.length;

        }
      },
      error: (err: any) => {
        return (this.pendingOrderError = err.error);
      },
    };

    return this.artisanurl
      .artisanGetPendingOrders()
      .subscribe(registerObserver);
  }

  artisanAcceptOrders(row: any) {
    this.serviceOrdeIdForm.value.serviceOrdeId = row.id;

    this.artisanurl
      .artisanAcceptOrdersUrl(this.serviceOrdeIdForm.value)
      .subscribe((res: any) => {
        this.toastr.success('Order Approve Successfully!!');

        this.getAllOrder();
        // this.getAllOrder();
      });
  }
  artisanCancelOrders(row: any) {
    this.serviceOrdeIdForm.value.serviceOrdeId = row.id;

    this.artisanurl
      .artisanCancelOrderUrl(this.serviceOrdeIdForm.value)
      .subscribe((res: any) => {
        this.getAllOrder();
      });
  }

  completeOrder(row: any) {
    this.serviceOrdeIdForm.value.serviceOrdeId = row.id;

    this.artisanurl
      .artisanCompleteOrder(this.serviceOrdeIdForm.value)
      .subscribe((res: any) => {
        this.toastr.success('Order Approve Successfully!!');

        // this.isAprove = !this.isAprove;
        this.getAllOrder();
      });
  }

  getCompletedOrder() {
    const registerObserver = {
      next: (res: any) => {
        if(res){
          this.completeOrderData = res;
          this.completeOrderLength = res.length;
          return this.completeOrderData.reverse();
        }
        
      },
      error: (err: any) => {
        return (this.completeOrderError = err.error);
      },
    };
    this.artisanurl.artisanGetCompletedOrder().subscribe(registerObserver);
  }
  getCancelOrder() {
    const registerObserver = {
      next: (res: any) => {
        if(res){
          this.cancelOrderData = res;
        this.cancelOrderLength = res.length;
        return this.completeOrderData.reverse();

        }
        
      },
      error: (err: any) => {
        return (this.cancelOrderError = err.error);
      },
    };
    this.artisanurl.artisanGetCancedOrder().subscribe(registerObserver);
  }
  onClickViewOrder(data: any) {
    (this.signupForm.value.invoiceId = data.id),
    
      this.artisanurl
        .getOrderById(this.signupForm.value, data.id)
        .subscribe((data: any) => {
          this.orderById = data;
          this.orderDate = data.date
          this.orderfiles = data.filePaths
        });
  }

  // submitQuote() {
  //   this.InvoiceObject.invoiceTotal = this.grandtotal;
    

  //   let itemsDto = [];

  //   for (let index = 0; index < this.InvoiceObject.items.length; index++) {
  //     this.itemsArray[index].total = this.hope;
  //   }

  //   const uploadObserver = {
  //     next: (event: any) => {
  //       this.toastr.success('invoice created successfully');
  //     this.getAllOrder();

  //     // this.modalRef?.hide();
  //     this.closeModal()

  //     },
  //     error: (err: any) => {
  //       if (err.error && err.error.message) {
  //         this.message = err.error.message;
  //         this.toastr.warning(this.message);
          
          

  //       } else {
  //         // this.message = 'Could not upload the file!';
  //         this.toastr.warning(this.message);
  //         this.message2 = err.error
         

  //       }
  //     },
  //   };
  //   this.artisanurl.generateInvoice(this.InvoiceObject).subscribe(uploadObserver);
  // }


  
  sendInvoice() {
    for (let index = 0; index < this.invoice.items.length; index++) {
      this.invoice.invoiceTotal = this.hope;
      
    }
    this.invoice.orderId = this.InvoiceObject.orderId

    this.InvoiceObject.invoiceTotal = this.grandtotal;

    // Assuming you have an API endpoint to send the invoice data
    // const apiUrl = 'https://example.com/api/invoices';
    const uploadObserver = {
      next: (event: any) => {
        this.toastr.success('invoice created successfully');
        this.getAllOrder();
  
        // this.modalRef?.hide();
        this.closeModal()
window.location.reload();
      },
      error: (err: any) => {
        if(typeof err.error === "object"){
          this.message2 = "Complete all fields for the best service.";
        }else {
          this.toastr.warning(this.message);
          this.message2 = err.error
          // this.message = 'Could not upload the file!';
        }
      },
    };

    this.artisanurl.generateInvoice(this.invoice).subscribe(uploadObserver);
  }
 //testing for totals
 overallTotal: number = 0;
 calculateOverallMainProductTotal() {
  this.overallTotal = this.invoice.items.reduce((total, item) => {
    const mainProductTotal = (item.mainProduct.price || 0) * (item.mainProduct.quantity || 0);
    return total + mainProductTotal + (+this.invoice.artisanCharge);
  }, 0);
}



  removeRow(i: number) {
    this.invoice.items.splice(i);
  }

  grandtotal: number = 0;
  getInvoiceTotalAmount() {
     const data= this.itemsArray.reduce((acc, item) => {
      
      acc += this.updateTotalInItemsArray(item);
      
      this.grandtotal = (+this.InvoiceObject.artisanCharge) + (+acc);
      
// const total = +this.InvoiceObject.artisanCharge + (+acc)
      return acc;
    }, -0);
    const total = +(this.InvoiceObject.artisanCharge) + (+data)
    
      return total;
    
  }

  updateTotalInItemsArray(item: itemObject) {
    
    item.total = item.quantity && item.price ? item.quantity * item.price : 0;
    return item.total;
  }

  


  // get() {
  //   this.api.getLocation().subscribe((data: any) => {
  //     this.state2 = data;
  //   });
  // }
 
  getServiceCategory(){
    this.artisanurl.getAllServiceCategory().subscribe(res =>{
      
      this.categoryData =res
    })
  }
  getSubcategoryid(data: any){
    
    this.artisanurl.getAllCategory(data).subscribe(res =>{
      
    })
  }
  onChangeState(event: any) {
    
    let userProfile = this.myForm.controls['firstSelect'].value;
    // let userProfile = this.signupForm.controls['state'].value;
    if (userProfile) {
      this.artisanurl.getAllCategory(userProfile).subscribe((data: any) => {
        
        this.categoryValue = data;
      });
    }
  }

  
  onChangeCity(event: any) {
    

  }
  checkforchange(data :any){
    
  }

  filterByDate() {
    let k = 0;
    var ivTemp = this.AllOrderData;

    this.filteredOrderData = [...this.AllOrderData];

    if (this.filteredOrderData! == '') {
      ivTemp = this.filteredOrderData;
    }

    const isInRange = (element: any) => {
      const fDate = new Date(this.fromDate1);
      const tDate = new Date(this.toDate1);
      const elementFDate = new Date(element['date']);

      return elementFDate > fDate && elementFDate < tDate;
    };
    const result = Object.values(ivTemp).filter(isInRange);
    return (this.filteredOrderData = result);
  }
  Search(event: any) {
    if (this.value == '') {
      this.getAllOrder();
    } else {
      this.filteredOrderData = this.AllOrderData.filter((res: any) => {
        return res.issue
          .toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
    // return this.hope;
  }

  hidden: boolean = false;

  imageSource() {
    this.hidden = !this.hidden;
  }

  getCategory(){

  }
  getSubCategory(){

  }
  onFirstDropdownChange() {
    this.changeDetectorRef.detectChanges();
  }
}
