import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css'],
  providers: [DatePipe],
})
export class AlltransactionsComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(null),
  });

  Operations!: any[]; // set this however you did before.
  filteredOperations: any[] = [];

  accept: boolean = false;
  // isAprove: boolean = false;
  process: boolean = false;
  // orderId: string = '';
  orderForm!: FormGroup;
  reassignForm!: FormGroup;
  service = 'completed';
  othersData: any;
  totalLength: any;

  totalRecord: any;
  page: number = 1;
  cancelPage: number = 1;
  completePage: number = 1;
  pendingPage: number = 1;
  allPage: number = 1;
  completedPage: number = 1;
  // cancelPage: number = 1;
  length = 10;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  pending: any;
  pendingOrderError: any;
  pendingLength: any;
  completedOrder: any;
  completedOrderLength: any;
  canceledOrder: any;
  canceledOrderLength: any;
  assignArtisan: any;
  value!: '';
  modalRef?: BsModalRef;
  orderById: any;
  rating4: number = 0;
  filteredOrderData: any;
  fromDate1: any;
  toDate1: any;
  hidden2: boolean = false;
  message: any;
  searchText: any;
  errorMessage: any;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  AllOrderData: any;
  constructor(
    private adminApi: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private modalService: BsModalService //for ngx-bootstrap modal
  ) {}

  ngOnInit(): void {
    this.getAllOrder();
    this.pendingOrder();
    this.getAllCompletedOrder();
    this.getAllCanceledOrder();

    this.orderForm = this.formBuilder.group({
      orderId: 0,
    });
    this.reassignForm = this.formBuilder.group({
      orderId: 0,
      artisanId: 0,
    });
  }
  clickEvent() {
    this.accept = !this.accept;
  }

  getAllOrder() {
    this.adminApi.getOrder().subscribe((res: any) => {
      this.totalLength = res.length;
      this.AllOrderData = res;

      this.filteredOrderData = [...this.AllOrderData];
      return this.filteredOrderData.reverse();
    });
  }

  aproveOrder(row: any) {
    this.orderForm.value.orderId = row.id;

    this.adminApi.aproveOrderUrl(this.orderForm.value).subscribe((res: any) => {
      this.toastr.success('Order Approved Successfully!!');

      this.getAllOrder();
    });
  }

  rejectOrder(row: any) {
    this.orderForm.value.orderId = row.id;

    this.adminApi.rejectOrderUrl(this.orderForm.value).subscribe((res: any) => {
      this.toastr.success('Order Rejected!!');

      this.getAllOrder();
    });
  }
  pendingOrder() {
    const registerObserver = {
      next: (res: any) => {
        this.pending = res;
        this.pendingLength = res.length;
      },
      error: (err: any) => {
        return (this.pendingOrderError = err.error);
      },
    };

    return this.adminApi.getPendingOrder().subscribe(registerObserver);
  }

  getAllCompletedOrder() {
    this.adminApi.getCompletedOrder().subscribe((data: any) => {
      this.completedOrder = data;
      this.completedOrderLength = data.length;
    });
  }
  getAllCanceledOrder() {
    this.adminApi.getCanceledOrder().subscribe((data: any) => {
      this.canceledOrder = data;
      this.canceledOrderLength = data.length;
    });
  }
  hope: any;
  hope2: any;

  getArtisanToReassign(data: any) {
    this.orderForm.value.orderId = data.id;
    this.assignArtisan = data;
    this.hope2 = data;

    const reAssignObserver = {
      next: (event: any) => {
        console.log(event);
        this.assignArtisan = event;
        this.hope2 = data;
      },
      error: (err: any) => {
        console.log(err.error);
        this.errorMessage = err.error;
      },
    };

    this.hope = data;

    this.adminApi
      .reassignArtisan1(this.orderForm.value, data.id)
      .subscribe(reAssignObserver);
  }
  hope3: any;
  onChangeArtisan(event: any) {
    this.hope3 = `${event.value}`;
  }

  reassignArtisan(data: any) {
    console.log(data);

    data = this.hope2;
    console.log(this.hope3);

    this.reassignForm.value.orderId = this.hope.id;
    this.reassignForm.value.artisanId = this.hope3;
    console.log(this.reassignForm.value);

    const reAssignObserver = {
      next: (event: any) => {
        console.log(event);

        this.toastr.success('Order successfully Re-assign to Artisan!!!');
      },
      error: (err: any) => {
        console.log(err);

        if (err.error && err.error.message) {
          this.message = err.error.message;
          this.toastr.warning(this.message);
        } else {
          // this.message = 'Could not upload the file!';
          this.toastr.warning(this.message);
        }
      },
    };

    this.adminApi
      .reassignArtisan2(this.reassignForm.value)
      .subscribe(reAssignObserver);
  }
  Search(event: any) {
    if (this.value == '') {
      this.getAllOrder();
    } else {
      this.AllOrderData = this.AllOrderData.filter((res: any) => {
        return res.issue
          .toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
    // return this.hope;
  }
  Search2(event: any) {
    if (this.value == '') {
      this.getAllOrder();
    } else {
      this.AllOrderData = this.AllOrderData.filter((res: any) => {
        return res.issue
          .toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
    // return this.hope;
  }

  onClickVieworder(data: any) {
    (this.orderForm.value.invoiceId = data.id),
      this.adminApi
        .getOrderById(this.orderForm.value, data.id)
        .subscribe((data: any) => {
          this.orderById = data;
          this.rating4 = data.artisanRating;
        });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  start_date = new Date('YYYY-MM-DD');
  end_date = new Date();
  public daterange: any = {};

  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };

  public selectedDate(value: any, datepicker?: any) {
    // this is the date  selected

    if (this.range.value == '') {
      this.getAllOrder();
    } else {
      this.AllOrderData = this.AllOrderData.filter((e: any) => {
        let latest_date = this.datepipe.transform(this.start_date, 'fullDate');

        const data = e.date === latest_date;

        return e.date.match(this.start_date?.toString);
      });
    }
  }
  filterByDate() {
    let k = 0;
    var ivTemp = this.AllOrderData;

    this.filteredOrderData = [...this.AllOrderData];

    if (this.filteredOrderData !== '') {
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

  hidden: boolean = false;

  imageSource() {
    this.hidden = !this.hidden;
  }
  imageSource2() {
    this.hidden2 = !this.hidden2;
  }
}
