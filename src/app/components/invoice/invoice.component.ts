import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApiService } from 'src/app/service/api.service';
import { ArtisantransactionsComponent } from '../artisantransactions/artisantransactions.component';
import { userProfileModel } from '../userprofile/userprofile.model';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

class Product {
  name!: string;
  price!: number;
  qty!: number;
  total!: number;
}
// class Invoice {
//   customerName!: string;
//   address!: string;
//   contactNo!: string;
//   email!: string;
//    ID!:string;
//    orderId!:number;
//   products: Product[] = [];
//   additionalDetails!: string;
//   submitted = false;
//   constructor() {
//     // Initially one empty product row we will show
//     this.products.push(new Product());
//   }
// }
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  // @Input() lastName!: string;
  // @Input()  check!:any;
  invoice:any= {
    customerName:[],
    address:[],
    contactNo:[],
    email:[],
     ID:null,
     orderId:null,
    products:  [],
    // products:  typeof Product[],
    
    additionalDetails:[],
    // submitted = false
    constructor() {
          // Initially one empty product row we will show
          this.products.push(new Product());
        }
  }
  

  userprofileModelObj: userProfileModel = new userProfileModel();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    // private transaction :ArtisantransactionsComponent
  ) {}
  // invoice = new this.Invoice();     
  submitted = false;  
  generatePDF(action = 'open') {    
        
    let docDefinition = {  
      content: [  
        {  
          text: 'ELECTRONIC SHOP',  
          fontSize: 16,  
          alignment: 'center' as const,  
          color: '#047886'  
        },  
        {  
          text: 'INVOICE',  
          fontSize: 20,  
          bold: true,  
          alignment: 'center'as const,  
          decoration: 'underline' as const,  
          color: 'skyblue'  
        },
        {  
          text: 'Customer Details',  
          style: 'sectionHeader'  
      },
      {
        columns: [
          [
            {
              text: this.invoice.customerName,
              bold:true
            },
            { text: this.invoice.address },
            { text: this.invoice.email },
            { text: this.invoice.contactNo },
        ],
        [
          {
            text: `Date: ${new Date().toLocaleString()}`,
            alignment: 'right' as const
          },
          { 
            text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
            alignment: 'right' as const
          } 
        ]
      ]
      },
      {
        text: 'Order Details',
        style: 'sectionHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Product', 'Price', 'Quantity', 'Amount'],
            ...this.invoice.products.map((p:any) => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
            [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum:any, p:any)=> sum + (p.qty * p.price), 0).toFixed(2)]
          ]
        }
      },
      {
        text: 'Additional Details',
        style: 'sectionHeader',
      },
      {
        text: this.invoice.additionalDetails,
        // margin: [0, 0 ,0, 15] 
      },
      {
        columns: [
          [{
            qr: `${this.invoice.customerName}`,
          //  fit: '50' as const
          }],
          [{ text: 'Signature', alignment: 'right' as const, italics: true}],
        ]
      },
      {
        text: 'Terms and Conditions',
        style: 'sectionHeader'
      },
      {
        ul: [
          'Order can be return in max 10 days.',
          'Warrenty of the product will be subject to the manufacturer terms and conditions.',
          'This is system generated invoice.',
        ],
    }
      
      ],
      styles: {  
        sectionHeader: {  
            bold: true,  
            decoration: 'underline' as const,  
            fontSize: 14,  
            // margin: [0, 15, 0, 15] as const,
        }  
    } 
      } 
    
    if(action==='download'){    
      pdfMake.createPdf(docDefinition).download();    
    }else if(action === 'print'){    
      pdfMake.createPdf(docDefinition).print();          
    }else{    
      pdfMake.createPdf(docDefinition).open();          
    } 

    console.log(docDefinition.content);
    
  }    

  onEdit(row: any) {
    console.log(row.id);
   
    this.userprofileModelObj.orderId = row.id;
    this.userprofileModelObj.firstName = row.firstName;
    this.userprofileModelObj.lastName = row.lastName;
    this.userprofileModelObj.propertyAddress = row.propertyAddress;
    this.userprofileModelObj.city = row.city;
    this.userprofileModelObj.state = row.state;
    this.userprofileModelObj.phoneNumber = row.PhoneNumber;
    this.userprofileModelObj.artisanId = row.artisanId;
    console.log(this.userprofileModelObj.orderId );
    
    this.invoice.controls['orderId'].setValue(row.orderId);
    // this.updateOrder.controls['orderId'].setValue(row.id);
 
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
  addProduct(){    
    this.invoice.products.push(new Product());    
  } 
  onSubmit() {
    console.log(this.api);
    this.userprofileModelObj.orderId = this.invoice.orderId;

    // this.userprofileModelObj.artisanId = this.updateOrder.value.artisanId;
    // this.userprofileModelObj.firstName = this.updateOrder.value.firstName;
    // this.userprofileModelObj.lastName = this.updateOrder.value.lastName;
    // this.userprofileModelObj.propertyAddress =
    //   this.updateOrder.value.propertyAddress;
    // this.userprofileModelObj.city = this.updateOrder.value.city;
    // this.userprofileModelObj.state = this.updateOrder.value.state;
    // this.userprofileModelObj.phoneNumber = this.updateOrder.value.PhoneNumber;
    // this.userprofileModelObj.artisanId = this.updateOrder.value.artisanId;
    this.api.generateInvoice(this.invoice).subscribe((res: any) => {
      console.log(res);
      // this.toastr.success('Profile updated');

      //   // let ref = document.getElementById('cancel'); //this is to close the modal form automatically
      //   // ref?.click();

      // this.getUserserInfo() //this is to refresh and get the resent data
    });
    
    // console.log(this.invoice);
    // this.invoice['ID']= (data.id);
    // this.submitted = false;
    // this.alertService.info('Working on creating new account');

    // const registerObserver = {
    //   next: (res: any) => {
    //     this.router.navigate(['/checkemail']);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //     this.alertService.danger('signup failed');
    //   },
    // };

    // this.api.generateInvoice(this.invoice).subscribe(registerObserver);
  }

}
