import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css']
})
export class AlltransactionsComponent implements OnInit {

  accept: boolean = false;

  process: boolean = false

  service = 'completed';  
  othersData: any;
  totalRecord: any;
  page:number=1
  constructor(private adminApi :AdminService ) { }

  ngOnInit(): void {
    this.getAllOthers()
  }
clickEvent(){
  this.accept = !this.accept
}

getAllOthers() {
  this.adminApi.getOthers().subscribe((res: any) => {
    this.othersData = res;
    console.log(this.othersData)
    this.totalRecord=res.length;
    console.log(this.totalRecord);
  });
}
}
