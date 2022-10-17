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
  name!: string;
  price!: number;
  quantity!: number;
  total!: number;
}

@Component({
  selector: 'app-artisantransactions',
  templateUrl: './artisantransactions.component.html',
  styleUrls: ['./artisantransactions.component.css'],
})
export class ArtisantransactionsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();

  itemObject = new itemObject();
  itemsArray: Array<itemObject> = [
    {
      name: '',
      price: 0,
      quantity: 0,
      total: 0,
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
        this.AllpendingData = res;
        this.AllpendingLength = res.length;
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
        this.completeOrderData = res;
        this.completeOrderLength = res.length;
        return this.completeOrderData.reverse();
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
        this.cancelOrderData = res;
        this.cancelOrderLength = res.length;
        return this.completeOrderData.reverse();
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
        });
  }

  submitQuote() {
    this.InvoiceObject.invoiceTotal = this.grandtotal;

    let itemsDto = [];

    for (let index = 0; index < this.InvoiceObject.items.length; index++) {
      this.itemsArray[index].total = this.hope;
    }

    const uploadObserver = {
      next: (event: any) => {
        this.toastr.success('invoice created successfully');
      this.getAllOrder();

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
    this.artisanurl.generateInvoice(this.InvoiceObject).subscribe(uploadObserver);
  }

  addRow() {
    this.itemsArray.push(new itemObject());
  }

  removeRow(i: number) {
    this.itemsArray.splice(i);
  }

  grandtotal: number = 0;
  getInvoiceTotalAmount() {
    return this.itemsArray.reduce((acc, item) => {
      acc += this.updateTotalInItemsArray(item);
      this.grandtotal = acc;

      return acc;
    }, 0);
  }

  updateTotalInItemsArray(item: itemObject) {
    item.total = item.quantity && item.price ? item.quantity * item.price : 0;
    return item.total;
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
}
