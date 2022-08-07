import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css']
})
export class AlltransactionsComponent implements OnInit {

  accept: boolean = false;
  orderId: boolean =false;
  process: boolean = false

  service = 'completed';  
  othersData: any;
  totalRecord: any;
  page:number=1
  AllOrderData: any;
  constructor(private adminApi :AdminService ) { }

  ngOnInit(): void {
    this.getAllOrder()
  }
clickEvent(){
  this.accept = !this.accept
}

getAllOrder() {
  this.adminApi.getOrder().subscribe((res: any) => {
    console.log(res);
    
    this.AllOrderData = res;
    console.log(this.othersData)
  });
}
aproveOrder(row:any){
  this.orderId = true;
  console.log( this.orderId);
  console.log(row.id);
  
  
this.adminApi.aproveOrderUrl(row).subscribe((res:any) =>{
  this.orderId = !this.orderId;
  console.log(res);

  
  
})

  console.log(row);
 
  

}
}
