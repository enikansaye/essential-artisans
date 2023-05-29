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
  paymentForm !: FormGroup

  constructor(
    private api : ApiService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.getCompletedPayment()
    this.paymentForm = this.formBuilder.group({
      orderId : ['']
    })
  }
getPendingPaymment(){
  return this.api.getPendingPayment().subscribe(res => {
    console.log(res);
    this.pendingData = res;
    
  })

}
getQueuedPayment(){
return this.api.getQueuedPayment().subscribe(res => {
  console.log(res);
  this.queuedData = res;
  
})
}
getFailedPayment(){
  return this.api.getFailedPayment().subscribe(res => {
    console.log(res);
    this.failedData = res
    
  })

}
getCompletedPayment(){
  return this.api.getCompletedPayment().subscribe(res => {
    console.log(res);
    this.completedData = res;
    
  })

}
makePayment(data: any){
  return this.api.makePayment(this.paymentForm.value, data.orderId).subscribe(res => {
    console.log(res);
    
    
  })

}
}
