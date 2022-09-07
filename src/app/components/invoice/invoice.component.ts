import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ToastrService } from 'ngx-toastr';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApiService } from 'src/app/service/api.service';
import { ArtisansService } from 'src/app/service/artisans.service';
import { ArtisantransactionsComponent } from '../artisantransactions/artisantransactions.component';
import { userProfileModel } from '../userprofile/userprofile.model';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

class itemObject {
  itemName!: string;
  unitPrice!: number;
  quantity!: number;
  total!: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  @Output() newItemEvent = new EventEmitter<string>();

  InvoiceObject = {
    items: [
      {
        description: '',
        quantity: '',
        price: '',
        name: '',
        invoiceDate: '',
        invoiceNo: '',
        itemNo: '',
        totalAmount: '',
        total: '',
        itemName: '',
      },
    ],
    orderId: 1,
  };

  // itemObject=new itemObject()
  itemsArray: Array<itemObject> = [
    {
      itemName: '',
      unitPrice: 0,
      quantity: 0,
      total: 0,
    },
  ];

  userprofileModelObj: userProfileModel = new userProfileModel();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private artisanurl: ArtisansService
  ) // private transaction :ArtisantransactionsComponent
  {}

  addInvoiceBody(data: any) {
    console.log(data);

    this.artisanurl
      .generateInvoice(this.InvoiceObject)
      .subscribe((res: any) => {
        this.toastr.success('invoice successfully sent');
        // form.reset()
        console.log(res);
      });
  }

  addRow() {
    this.itemsArray.push(new itemObject());
  }

  removeRow(i: any) {
    this.itemsArray.splice(i);
  }

  chenk: number = 0;
  getInvoiceTotalAmount() {
    return this.itemsArray.reduce((acc, item) => {
      acc += this.updateTotalInItemsArray(item);
      console.log(item);

      console.log(acc);
      this.chenk = acc;
      return this.chenk;
    }, 0);
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  hope: number = 0;

  updateTotalInItemsArray(item: itemObject) {
    item.total =
      item.quantity && item.unitPrice ? item.quantity * item.unitPrice : 0;
    this.hope = item.total;
    // this.InvoiceObject.items.total

    return this.hope;
  }
}
