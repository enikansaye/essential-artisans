import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  modalRef?: BsModalRef;
  addMoneyForm !: FormGroup;
  submitted : boolean = false;
  errorMessage : any
  walletBalance : any;
  balance : any;
  walletTransactions : any;
  wallet : any
  date :any;
  time : any
  constructor(
    private modalService: BsModalService,
    private formbuilder : FormBuilder,
    private toastr : ToastrService,
    private api : ApiService,
    // private router : Router

  ) { }

  ngOnInit(): void {
    this.addMoneyForm = this.formbuilder.group({
      amount : ['', Validators.required]
    })
this.getBalance();
this.getTransactions();
  }
  get f(){
    return this.addMoneyForm.controls
  }

  onSubmit(data : any){
    this.submitted = true
    const formObserver = {
      next : (res : any) => {
        // this.router.navigateByUrl(res.data.link)
        window.location.href = res.data.link;
},
      error : (err : any) => {

      }
    }
    this.api.creditWallet(data).subscribe(formObserver)

  }
  getBalance(){
    this.api.getWalletBalannce().subscribe(res => {
      this.balance = res
      this.walletBalance = this.balance.walletBalance
      
    })
  }
  getTransactions(){
    this.api.getWalletTransactions().subscribe(res => {
      this.wallet = res;
      this.walletTransactions = this.wallet.reverse();
      for(let data of this.walletTransactions){
        const date = new Date(data.dateOfTransaction);
              this.date = date.toLocaleString();
              // const time1 = new Date(data.offTime);
             
    
      }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      ariaDescribedby: 'my-modal-description',
      ariaLabelledBy: 'my-modal-title',
    });
  }
}
