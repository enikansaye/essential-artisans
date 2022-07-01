import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  userData: any;
  totalRecord: any;
  page!:string

  constructor( private adminApi: AdminService) { }

  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser() {
    this.adminApi.getUser().subscribe((res: any) => {
      this.userData = res;
  
      console.log(this.userData)
      this.totalRecord=res.length;
      console.log(this.totalRecord);
      
    
    });
  }

}
