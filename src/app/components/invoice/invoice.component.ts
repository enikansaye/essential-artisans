import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ToastrService } from 'ngx-toastr';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApiService } from 'src/app/service/api.service';
import { ArtisantransactionsComponent } from '../artisantransactions/artisantransactions.component';
import { userProfileModel } from '../userprofile/userprofile.model';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

class itemObject {
  itemNo!:string;
  unitPrice!:number;
  quantity!:number;
  total!:number;
  

}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  @Output() newItemEvent = new EventEmitter<string>();

 
 
  InvoiceObject={
  
    items:[
      {
        description:'',
        quantity:'',
        price:'',
        name:'',
        invoiceDate:'',
        invoiceNo:'',
        itemNo:'',
        totalAmount:'',
        total:'',
       
      }
    ],
    orderId:1
    
  }


  
  
  itemObject=new itemObject()
  itemsArray:Array<itemObject>=[
    {
      itemNo:"",
      unitPrice:0,
      quantity:0,
      total:0
      
  
    }
  ]
  

  userprofileModelObj: userProfileModel = new userProfileModel();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    private toastr: ToastrService
    // private transaction :ArtisantransactionsComponent
  ) {}


//   addInvoiceInformation() {

//     console.log(this.InvoiceObject)
//     this.invoiceService.addInvoiceInformationInToDatabase(this.InvoiceObject).subscribe(result=>{
//        console.log(result)
//  })

// }

addInvoiceBody(data:any) {
console.log(data)


this.api.generateInvoice(this.InvoiceObject).subscribe((res: any) => {
  this.toastr.success('invoice successfully sent');
  // form.reset()
  console.log(res);
 
});
// this.invoiceService.addInvoiceBodyInToDatabase(this.itemsArray).subscribe(result=>{
// console.log(result)
// })


}

addRow() {
this.itemsArray.push(this.itemObject)
// this.itemsArray.push(this.itemObject)
// this.invoice.products.push(new Product()); 


}

removeRow(product:any) {
// this.itemsArray.splice(i)
this.itemsArray.map((a:any,i:any)=>{
  if(product.id === a.id){
    this.itemsArray.splice(i,1)
  }
})

}


getInvoiceTotalAmount() {
return this.itemsArray.reduce((acc, item) => {
  acc += this.updateTotalInItemsArray(item);
  return acc;
}, 0)

}


updateTotalInItemsArray(item: itemObject) {
item.total =(item.quantity && item.unitPrice) ? item.quantity * item.unitPrice:0;
return item.total
}



 

}
