import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

class Product{    
  name!: string;    
  price!: number;    
  qty!: number;
  total!:number    
}    
class Invoice{    
  customerName!: string;    
  address!: string;    
  contactNo!: number;    
  email!: string;    
   total!:number;   
   grandTotal!:number;   
  products: Product[] = [];    
  additionalDetails!: string;    
    
  constructor(){    
    // Initially one empty product row we will show     
    this.products.push(new Product());    
  }    
} 

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  invoice = new Invoice();   
  newItemEvent: any;
  // invoiceForm!: FormGroup;
 

total(){

  return this.invoice.products.reduce((acc) => {
    acc += this.invoice.products.reduce((sum:any, p:any)=> sum + (p.qty * p.price), 0).toFixed(2);
    this.newItemEvent= acc
    return acc;
  },0)
  // invoice.products
  // this.invoice.products.reduce((sum:any, p:any)=> sum + (p.qty * p.price), 0).toFixed(2)
}


  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
  addProduct(){    
    this.invoice.products.push(new Product());    
  }  

  ngOnInit(): void {
    
  }
  onSubmit(data:any){

  }

}
