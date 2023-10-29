import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  completedData: any;
  failedData: any;
  queuedData: any;
  pendingData: any;
  paymentForm !: FormGroup;
  service = 'completed';

  constructor(
    private api : ApiService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.getCompletedPayment();
    this.getPendingPaymment();
    this.getQueuedPayment();
    this.getFailedPayment()
    this.paymentForm = this.formBuilder.group({
      orderId : ['']
    })
  }
getPendingPaymment(){
  return this.api.getPendingPayment().subscribe(res => {
    this.pendingData = res;
    
  })

}
getQueuedPayment(){
return this.api.getQueuedPayment().subscribe(res => {
  this.queuedData = res;
  
})
}
getFailedPayment(){
  return this.api.getFailedPayment().subscribe(res => {
    this.failedData = res
    
  })

}
getCompletedPayment(){
  return this.api.getCompletedPayment().subscribe(res => {
    this.completedData = res;
    
  })

}
orderId !: ""
makePayment(data: any){
  const payload = {
    orderId:  data.serviceOrderId

  }
  const test = this.paymentForm.value.orderId
  
  return this.api.makePayment(data.serviceOrderId, payload).subscribe(res => {
    
    
  })

}
}
