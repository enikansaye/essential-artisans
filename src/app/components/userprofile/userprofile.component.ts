import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav !: MatSidenav;

  expression = 'match1'
  
  userData: any;
  data: any;

  constructor(private observer : BreakpointObserver, private api:ApiService, ) { }


  ngOnInit(): void {
    // this.getAllEmployee()
    // this.getUserDetails()
  }
ngAfterViewInit(){
  this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
    if(res.matches){
      this.sidenav.mode = 'over';
      this.sidenav.close();
    }else{
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  })
}

// getUserDetails(id:any) {
  
//   this.api.getUser(id).subscribe((res: any) => {
//     this.data = res;
//   });
// }
// getAllEmployee() {
//   this.api.getEmployee().subscribe((res: any) => {
//     this.employeeData = res;
//   });
// }

// getAllEmployee(row:any) {
//   this.api.getUser(row.id).subscribe((res: any) => {
//     this.userData = res;
//   });
// }
// deleteEmployeeData(row: any) {
//   this.api.deleteEmployee(row.id).subscribe((res) => {
//     alert('employee deleted');
//     this.getAllEmployee(); //this is to automatically refresh the page
//   });
// }

}
