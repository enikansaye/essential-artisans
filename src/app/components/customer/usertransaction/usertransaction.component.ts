import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { userProfileModel } from '../userprofile/userprofile.model';

@Component({
  selector: 'app-usertransaction',
  templateUrl: './usertransaction.component.html',
  styleUrls: ['./usertransaction.component.css']
})
export class UsertransactionComponent implements OnInit {
    userProfileModelObj: userProfileModel = new userProfileModel();

  orderData : any;
  filteredOrderData : any;
  value: any;
  deleteForm !: FormGroup
  feeForm !: FormGroup
  updateOrder !: FormGroup
  form!: FormGroup;
  rating4 : any;
  orderById : any;
  modalRef?: BsModalRef;
  hidden2: boolean = false;
  hidden: boolean = false;
  p: number = 1; //pagination
  searchText: any;
  fromDate1 = '';
  toDate1 = '';




  constructor(private api : ApiService,
    private toastr : ToastrService,
    private modalService : BsModalService,
    private formBuilder : FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rating: ['', Validators.required],

      comment: [''],
      artisanId: 0,
      orderId: 0,
    });
    this.feeForm = this.formBuilder.group({
      inspectionFee: 0,
      inspectionDateAndTime: '',
      orderId: 0,
    });
    this.updateOrder = this.formBuilder.group({
      name: [''],
      artisanId: 0,
      propertyAddress: [''],
      inspectionDate: ['2022-06-30T10:58:37.452Z'],
      inspectionTime: ['2022-06-30T10:58:37.452Z'],
      mobilenumber: [''],
      AltNumber: [''],
      issue: [''],
      userId: 0,
      orderId: 0,
    });
    this.feeForm.disable();
    this.getOrder();
  }
  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  changeFee() {
    this.hidden2 = !this.hidden2;
  }
  imageSource() {
    this.hidden = !this.hidden;
  }

  getOrder() {
    this.api.getUserOrder().subscribe((data: any) => {
      this.orderData = data;
      

      this.filteredOrderData = [...this.orderData];
      return this.filteredOrderData.reverse();
    });
  }
  

  filterByDate() {
    let k = 0;
    var ivTemp = this.orderData;

    this.filteredOrderData = [...this.orderData];

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
  onClickViewOrder(data: any) {
    (this.deleteForm.value.invoiceId = data.id),
      this.api
        .getOrderById(this.deleteForm.value, data.id)
        .subscribe((data: any) => {
          this.orderById = data;
          this.rating4 = data.artisanRating;
        });
  }
  deleteOrder(row: any) {
    let body = {
      orderid: row.id,
    };

    this.api.deletes(body).subscribe((res) => {
      this.toastr.success('Order deleted');
      this.getOrder();
    });
  }
  onClickRating(row: any) {
    this.userProfileModelObj.artisanId = row.artisanId;
    this.userProfileModelObj.orderId = row.id;
    this.form.controls['artisanId'].setValue(row.artisanId);
    this.form.controls['orderId'].setValue(row.id);

    // this.form.controls['rating'].setValue('')
  }
  changeInspectionDate(row: any) {
    row = this.orderById;

    this.feeForm.value.orderId = row.id;

    this.api.updateInspectionDate(this.feeForm.value).subscribe((res: any) => {
      this.toastr.success('Inspection Fee Sucessfully Updated!!');
      this.feeForm.reset();
      this.hidden = !this.hidden;
    });

    this.toastr.warning('Something Went wrong!!');
  }
  submitRating(data: any) {
    const registerObserver = {
      next: (res: any) => {
        this.userProfileModelObj.artisanId = res.id;
        this.modalService.hide();
        // this.getOrder();
        this.toastr.success('Thanks, for your review');

        // this.router.navigate(['/checkemail']);
      },
      error: (err: any) => {},
    };

    this.api.postRating(this.form.value).subscribe(registerObserver);
  }


  Search(event: any) {
    if (this.value == '') {
      this.getOrder();
    } else {
      this.filteredOrderData = this.filteredOrderData.filter((res: any) => {
        return res.issue
          .toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
    // return this.hope;
  }
  search() {
    if (this.value == '') {
      this.getOrder();
    } else {
      this.filteredOrderData = this.filteredOrderData.filter((res: any) => {
        return res.issue
          .toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
  }
  applyFilter() {
    this.orderData.filter = '' + Math.random();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onEditOrder(row: any) {
    this.userProfileModelObj.userId = row.userId;
    this.userProfileModelObj.firstName = row.firstName;
    this.userProfileModelObj.lastName = row.lastName;
    this.userProfileModelObj.propertyAddress = row.propertyAddress;
    this.userProfileModelObj.city = row.city;
    this.userProfileModelObj.state = row.state;
    this.userProfileModelObj.issue = row.issue;
    this.userProfileModelObj.phoneNumber = row.PhoneNumber;
    this.userProfileModelObj.artisanId = row.artisanId;
    this.updateOrder.controls['artisanId'].setValue(row.artisanId);
    this.updateOrder.controls['orderId'].setValue(row.id);
    this.updateOrder.controls['name'].setValue(row.name);
    // this.updateOrder.controls['lastName'].setValue(row.lastName);
    this.updateOrder.controls['propertyAddress'].setValue(row.propertyAddress);
    // this.updateOrder.controls['city'].setValue(row.city);
    // this.updateOrder.controls['state'].setValue(row.state);
    this.updateOrder.controls['phoneNumber'].setValue(row.phoneNumber);
    this.updateOrder.controls['issue'].setValue(row.issue);
    this.updateOrder.controls['inspectionDate'].setValue(row.inspectionDate);
  }
}
