import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-orderedproduct',
  templateUrl: './orderedproduct.component.html',
  styleUrls: ['./orderedproduct.component.css']
})
export class OrderedproductComponent implements OnInit {
  orderData !: any
  productOrdered !: any;
  modalRef?: BsModalRef | null;
  customerPhoneNumber: any;
  customerAddress: any;
  customerName: any;


  constructor(private Api : ApiService,
    private modalService: BsModalService,
    ) { }

  ngOnInit(): void {
   this.getOrder();
  }
getOrder(){
  this.Api.getAllOrderedProduct().subscribe(res =>{
    console.log(res);
    this.orderData = res;
    this.customerAddress = this.orderData.customerAddress;
this.customerName = this.orderData.customerName;
this.customerPhoneNumber = this.orderData.customerPhoneNumber;  
for(const order of this.orderData ){
  this.productOrdered = order.productsOrdered;

}  

  })
}

onClickOrder(data :any){
console.log(data);
// this.customerAddress = data.customerAddress;
// this.customerName = data.customerName;
// this.customerPhoneNumber = data.customerPhoneNumber;

}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, {
    id: 1,
    class: 'modal-lg',
  });
}
}
