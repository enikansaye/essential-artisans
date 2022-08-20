import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApiService } from 'src/app/service/api.service';
import { AdminService } from 'src/app/shared/admin.service';
import { userProfileModel } from '../userprofile/userprofile.model';
// import {MatDialog,  MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

class Product{
  name!: string;
  price!: number;
  qty!: number;
  total!: number;
}

@Component({
  selector: 'app-artisantransactions',
  templateUrl: './artisantransactions.component.html',
  styleUrls: ['./artisantransactions.component.css']
})
export class ArtisantransactionsComponent implements OnInit {
  

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
  check!:any

  totalRecord: any;
  page: number = 1;
  length = 10;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  updateOrder!: FormGroup;


  invoice:any= {
    customerName:[],
    address:[],
    contactNo:[],
    email:[],
     ID:[''],
     orderId:0,
    products:  [],
    
    // products:  typeof Product[],
    
    additionalDetails:[],
    // submitted = false
    constructor() {
          // Initially one empty product row we will show
          this.products.push(new Product());
        }
  }

  
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  AllOrderData: any;
  constructor(
    private adminApi: AdminService,
    public api: ApiService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private modalService: BsModalService
  ) {}

  

  ngOnInit(): void {


    this.updateOrder = this.formBuilder.group({

    })

    // this.onEdit(this.check)
    this.getAllOrder();

    this.signupForm = this.formBuilder.group({
      orderId: 0,
    });
  }
  clickEvent() {
    this.accept = !this.accept;
  }

  openDialog() {
    // const dialogRef = this.dialog.open(DialogContentExampleDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

    
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.data = {};

    // this.dialog.open(DialogContentExampleDialog, dialogConfig);
  }

  
  onEdit(row: any) {
    
    console.log(row);
    console.log(row.id);
    // this.userprofileModelObj.orderId = row.id;
    this.invoice.setValue(row.id);
    console.log(this.invoice.setValue(row.id));
    console.log(this.invoice.patchValue(row.id));
    
    // this.invoice.controls['orderId'].setValue(row.id);
    
   
    
 
  }


  getAllOrder() {
    this.api.getArtisanOrder().subscribe((res: any) => {
      this.AllOrderData = res;
      console.log(this.AllOrderData);
      
    });
  }

  // generate invoice section

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
  addProduct(){    
    this.invoice.products.push(new Product());    
  } 
  onSubmit() {
    console.log(this.api);
    this.userprofileModelObj.orderId = this.invoice.orderId;


    this.api.generateInvoice(this.invoice).subscribe((res: any) => {
      console.log(res);
     
    });
    
    
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'second' });
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
  }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

}
// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'dialog-content-example-dialog.html',
// })
// class Product {
//   name!: string;
//   price!: number;
//   qty!: number;
//   total!: number;
// }
// export class DialogContentExampleDialog {
//   invoice:any= {
//     customerName:[],
//     address:[],
//     contactNo:[],
//     email:[],
//      ID:[''],
//      orderId:[''],
//     products:  [],
//     // products:  typeof Product[],
    
//     additionalDetails:[],
//     // submitted = false
//     constructor() {
//           // Initially one empty product row we will show
//           this.products.push(new Product());
//         }
//   }

//   generatePDF(action = 'open') {    
        
//     let docDefinition = {  
//       content: [  
//         {  
//           text: 'ELECTRONIC SHOP',  
//           fontSize: 16,  
//           alignment: 'center' as const,  
//           color: '#047886'  
//         },  
//         {  
//           text: 'INVOICE',  
//           fontSize: 20,  
//           bold: true,  
//           alignment: 'center'as const,  
//           decoration: 'underline' as const,  
//           color: 'skyblue'  
//         },
//         {  
//           text: 'Customer Details',  
//           style: 'sectionHeader'  
//       },
//       {
//         columns: [
//           [
//             {
//               text: this.invoice.customerName,
//               bold:true
//             },
//             { text: this.invoice.address },
//             { text: this.invoice.email },
//             { text: this.invoice.contactNo },
//         ],
//         [
//           {
//             text: `Date: ${new Date().toLocaleString()}`,
//             alignment: 'right' as const
//           },
//           { 
//             text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
//             alignment: 'right' as const
//           } 
//         ]
//       ]
//       },
//       {
//         text: 'Order Details',
//         style: 'sectionHeader'
//       },
//       {
//         table: {
//           headerRows: 1,
//           widths: ['*', 'auto', 'auto', 'auto'],
//           body: [
//             ['Product', 'Price', 'Quantity', 'Amount'],
//             ...this.invoice.products.map((p:any) => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
//             [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum:any, p:any)=> sum + (p.qty * p.price), 0).toFixed(2)]
//           ]
//         }
//       },
//       {
//         text: 'Additional Details',
//         style: 'sectionHeader',
//       },
//       {
//         text: this.invoice.additionalDetails,
//         // margin: [0, 0 ,0, 15] 
//       },
//       {
//         columns: [
//           [{
//             qr: `${this.invoice.customerName}`,
//           //  fit: '50' as const
//           }],
//           [{ text: 'Signature', alignment: 'right' as const, italics: true}],
//         ]
//       },
//       {
//         text: 'Terms and Conditions',
//         style: 'sectionHeader'
//       },
//       {
//         ul: [
//           'Order can be return in max 10 days.',
//           'Warrenty of the product will be subject to the manufacturer terms and conditions.',
//           'This is system generated invoice.',
//         ],
//     }
      
//       ],
//       styles: {  
//         sectionHeader: {  
//             bold: true,  
//             decoration: 'underline' as const,  
//             fontSize: 14,  
//             // margin: [0, 15, 0, 15] as const,
//         }  
//     } 
//       } 
    
//     if(action==='download'){    
//       pdfMake.createPdf(docDefinition).download();    
//     }else if(action === 'print'){    
//       pdfMake.createPdf(docDefinition).print();          
//     }else{    
//       pdfMake.createPdf(docDefinition).open();          
//     } 

//     console.log(docDefinition.content);
    
//   }
//   addProduct(){    
//     this.invoice.products.push(new Product());    
//   } 
// }
