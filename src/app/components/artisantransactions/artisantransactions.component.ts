import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { userProfileModel } from '../userprofile/userprofile.model';
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

const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


class itemObject {
  name!:string;
  price!:number;
  quantity!:number;
  total!:number;
  

}


@Component({
  selector: 'app-artisantransactions',
  templateUrl: './artisantransactions.component.html',
  styleUrls: ['./artisantransactions.component.css'],
})
export class ArtisantransactionsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  // InvoiceObject = {
  //   items: [
  //     {
  //       description: '',
  //       quantity: '',
  //       price: '',
  //       name: '',
  //       invoiceDate: '',
  //       invoiceNo: '',
  //       itemNo: '',
  //       totalAmount: '',
        
  //       itemName: '',

  //     },
  //   ],
  //   total: '',
  //   artisanCharge:5000,
  //   orderId: 0,
  // };

  // // itemObject=new itemObject()
  // itemsArray: Array<itemObject> = [
  //   {
  //     itemName: '',
  //     unitPrice: 0,
  //     quantity: 0,
  //     total: 0,
  //   },
  // ];
  itemObject=new itemObject()
  itemsArray:Array<itemObject>=[
    {
      name:"",
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
    jobDescription:'',
    artisanCharge:0,
   items: this.itemsArray =[]
  }
  // products: Product[] = []
  

  


  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  //  lastName!:string;
  userprofileModelObj: userProfileModel = new userProfileModel();
  accept: boolean = false;
  // isAprove: boolean = false;
  process: boolean = false;
  // orderId: string = '';
  signupForm!: FormGroup;
  service = 'completed';
  othersData: any;
  check!: any;

  totalRecord: any;
  page: number = 1;
  completePage: number = 1;
  length = 10;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  // invoiceForm!: FormGroup;
  totalLength: any;
  serviceOrdeIdForm!: FormGroup;
  issue: any; //string for search of data
  p: number = 1; //pagination
  pendingPage: number = 1; //pagination
  completeOrderData:any
  completeOrderLength:any
  AllpendingLength: any;
  completeOrderError: any;
  pendingOrderError: any;
  cancelOrderError: any;
  cancelOrderData: any;
  cancelOrderLength: any;
hope:any
  orderById: any;
  value: any;
  filteredOrderData: any;
  fromDate1: any;
  toDate1: any;
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  AllpendingData: any;
  AllOrderData: any;
  constructor(
    private adminApi: AdminService,
    public api: ApiService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private artisanurl: ArtisansService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // this.onEdit(this.check)
    this.getCompletedOrder();
    this.getPendingOrder();
    this.getAllOrder();
    this.getCancelOrder();

    this.signupForm = this.formBuilder.group({
      orderId: 0,
    });
    this.serviceOrdeIdForm = this.formBuilder.group({
      serviceOrdeId: 0,
    });
  }

  

  openDialog() {}

  onEdit(row: any) {
    console.log(row);
    // console.log(row.id);
    this.InvoiceObject.orderId = row.id;
    // this.invoice.id = row.id;
    // console.log(this.invoice.id);
  }
  
  

  getAllOrder() {
    this.artisanurl.getArtisanOrder().subscribe((res: any) => {
      this.AllOrderData = res;
      console.log('this is total order for artisan',this.AllOrderData);
      this.totalLength = res.length;
      console.log(this.totalLength);

      console.log(res.length);
      this.filteredOrderData = [...this.AllOrderData]
      return this.filteredOrderData.reverse();
    });
  }
  // method for Search
  // Search(event: Event) {
  //   if (this.value == '') {
  //     this.getAllOrder();
  //   } else {
  //     this.AllOrderData = this.AllOrderData.filter((res: any) => {
  //       console.log(res);

  //       return res.issue
  //         .toLocaleLowerCase()
  //         .match(this.value.toLocaleLowerCase());
  //     });
  //   }
  // }
  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  // generate invoice section

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      id: 1,
      class: 'modal-lg',
    });
  }

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }

  getPendingOrder() {
    const registerObserver = {
      next: (res: any) => {
        console.log(res.length);
        this.AllpendingData = res;
        this.AllpendingLength = res.length;
  
        console.log('this is pending order ',this.AllpendingData);
      },
      error: (err: any) => {
        console.log(err.error);
        return this.pendingOrderError =err.error

       
      },
    };

    return this.artisanurl.artisanGetPendingOrders().subscribe(registerObserver);
  }



  artisanAcceptOrders(row: any) {
    console.log(row.id);
    this.serviceOrdeIdForm.value.serviceOrdeId = row.id;

    this.artisanurl
      .artisanAcceptOrdersUrl(this.serviceOrdeIdForm.value)
      .subscribe((res: any) => {
        this.toastr.success('Order Approve Successfully!!');

        console.log(res);
        this.getAllOrder()
        // this.getAllOrder();
      });

    console.log(row);
  }
  artisanCancelOrders(row: any) {
    console.log(row.id);
    this.serviceOrdeIdForm.value.serviceOrdeId = row.id;

    this.artisanurl
      .artisanCancelOrderUrl(this.serviceOrdeIdForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.getAllOrder()
        // this.getAllOrder();
      });

    console.log(row);
  }
  
  completeOrder(row: any) {
    console.log(row.id);
    console.log(row);

    this.serviceOrdeIdForm.value.serviceOrdeId = row.id;

    this.artisanurl
      .artisanCompleteOrder(this.serviceOrdeIdForm.value)
      .subscribe((res: any) => {
        this.toastr.success('Order Approve Successfully!!');

        // this.isAprove = !this.isAprove;
        console.log('this is artisan complete order',res);
        this.getAllOrder();
      });

    console.log(row);
  }

  getCompletedOrder() {

    const registerObserver = {
      next: (res: any) => {
        console.log(res);

        this.completeOrderData =res
      this.completeOrderLength =res.length
      console.log('this is from get complete order by artisan', res);
      return this.completeOrderData.reverse()
      },
      error: (err: any) => {
        console.log(err.error);
        return this.completeOrderError =err.error

       
      },
    };
    this.artisanurl.artisanGetCompletedOrder().subscribe(registerObserver)

  }
  getCancelOrder() {

    const registerObserver = {
      next: (res: any) => {
        console.log(res);

        this.cancelOrderData =res
      this.cancelOrderLength =res.length
      console.log('this is from get canceled order by artisan', res);
      return this.completeOrderData.reverse()
      },
      error: (err: any) => {
        console.log(err.error);
        return this.cancelOrderError =err.error

       
      },
    };
    this.artisanurl.artisanGetCancedOrder().subscribe(registerObserver)

  }
  onClickViewOrder(data:any){
    console.log(data);
    this.signupForm.value.invoiceId = data.id,
    
    
    this.artisanurl.getOrderById(this.signupForm.value ,data.id).subscribe((data: any) => {
      this.orderById = data
      console.log(data);
      
  
  })
  }

//   // invoive modal section
//   addInvoiceBody(data: any) {
//     console.log(data);
    
//     // Object.keys(this.InvoiceObject.items).forEach(key => {
//     //   console.log(key); // 👉️ "name", "country"
//     //   // console.log(this.InvoiceObject.items[key:number]); // 👉️ "Tom", "Chile"
      
//     // });
// this.InvoiceObject.total = this.hope
//    return this.artisanurl
//       .generateInvoice(this.InvoiceObject)
//       .subscribe((res: any, ) => {
        
//         this.toastr.success('invoice successfully sent');

//         // form.reset()
//         console.log(res);
//       });
//   }

//   addRow() {
//     this.itemsArray.push(new itemObject());
//   }

//   removeRow(i: any) {
//     this.itemsArray.splice(i);
//   }

//   chenk: number = 0;
//   getInvoiceTotalAmount() {
//     return this.itemsArray.reduce((acc, item) => {
//       console.log("this is item from data adding",item);
      
//       acc += this.updateTotalInItemsArray(item) + this.InvoiceObject.artisanCharge;
//       console.log(item);

//       console.log(acc);
//       this.chenk = acc;
//       return this.chenk;
//     }, 0);
//   }
//   getValue(event: Event): string {
//     return (event.target as HTMLInputElement).value;
//   }
//   hope:any;

//   updateTotalInItemsArray(item: itemObject) {
//     item.total =
//       item.quantity && item.unitPrice ? item.quantity * item.unitPrice : 0;
//     this.hope = item.total;
    

//     // this.InvoiceObject.items.total

//     return this.hope;
//   } 
//   checkoption(event: Event){
//     return (event.target as HTMLInputElement).value;
//   }

submitQuote() {
this.InvoiceObject.invoiceTotal = this.grandtotal
// let index = this.serviceItemsDetails.findIndex((x:any)=> {

// });

let itemsDto = []

for (let index = 0; index < this.InvoiceObject.items.length; index++) {      
  // itemsDto.push(data[index])
  // this.InvoiceObject.items[0].total =
  this.itemsArray[index].total = this.hope

}


  console.log(this.InvoiceObject)
  this.artisanurl.generateInvoice(this.InvoiceObject).subscribe(result=>{
    this.toastr.success('invoice created successfully')
    this.getAllOrder();

    this.modalRef?.hide()
     console.log(result)
})

}




// addInvoiceBody() {
// console.log(this.itemsArray)
// this.artisanurl.generateInvoice(this.itemsArray).subscribe(result=>{
// console.log(result)
// })


// }

addRow() {
this.itemsArray.push(new itemObject())


}

removeRow(i: number) {
this.itemsArray.splice(i)

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
    console.log(isInRange);
    
    const fDate = new Date(this.fromDate1);
    const tDate = new Date(this.toDate1);
    const elementFDate = new Date(element['date']);

    console.log(elementFDate);
    

    return (elementFDate > fDate && elementFDate < tDate);
  }
  const result = Object.values(ivTemp).filter(isInRange);
  return this.filteredOrderData =result
  
}
Search(event:any) {
  if (this.value == '') {
    console.log(this.value);
    
    this.getAllOrder();
  } else {
    this.filteredOrderData = this.AllOrderData.filter((res: any) => {
      console.log(res);
      
      return res.issue.toLocaleLowerCase()
        .match(this.value.toLocaleLowerCase());
    });
  }
// return this.hope;
}

hidden:boolean = false;

imageSource(){
    this.hidden = !this.hidden;
}


}
