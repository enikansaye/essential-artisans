import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/admin.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchText:any
  userData: any;
  totalRecord: any;
  userLength: any;
  value2 !: string;
  value: any;
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  userPage: number = 1;


  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  constructor(
    private toastr: ToastrService,
    private adminApi: AdminService,


  ) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.adminApi.getUser().subscribe((res: any) => {
      this.userData = res;

      this.totalRecord = res.length;
      this.userLength = res.length;
      return this.userData.reverse();
    });
  }

  Search2(event: any) {
    if (this.value2 == '') {
      this.getAllUser();
    } else {
      this.userData = this.userData.filter((res: any) => {
        return res.firstName
          .toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
  }

}
