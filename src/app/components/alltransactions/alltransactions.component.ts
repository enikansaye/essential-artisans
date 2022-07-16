import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css'],
})
export class AlltransactionsComponent implements OnInit {
  accept: boolean = false;
  // isAprove: boolean = false;
  process: boolean = false;
  // orderId: string = '';
  signupForm!: FormGroup;
  service = 'completed';
  othersData: any;

  totalRecord: any;
  page: number = 1;
  length = 10;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  AllOrderData: any;
  constructor(
    private adminApi: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllOrder();

    this.signupForm = this.formBuilder.group({
      orderId: 0,
    });
  }
  clickEvent() {
    this.accept = !this.accept;
  }

  getAllOrder() {
    this.adminApi.getOrder().subscribe((res: any) => {
      console.log(res);

      this.AllOrderData = res;
      console.log(this.othersData);
    });
  }

  aproveOrder(row: any) {
    console.log(row.id);
    this.signupForm.value.orderId = row.id;

    this.adminApi
      .aproveOrderUrl(this.signupForm.value)
      .subscribe((res: any) => {
        // this.isAprove = !this.isAprove;
        console.log(res);
        this.getAllOrder()
      });

    console.log(row);
  }
}
