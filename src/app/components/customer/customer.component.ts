import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { SignalrService } from 'src/app/service/signalr.service';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  userData  : any
  modalRef2?: BsModalRef<unknown>;
  modalRef?: BsModalRef;
  serviceData : any


  constructor( private api : ApiService,
    private observer: BreakpointObserver,
    public data: UserService,
    private toastr : ToastrService,
    public signalRService: SignalrService,
    private modalService: BsModalService,
    private userApi: AdminService,

    ) { }

  ngOnInit(): void {
    this.getUser();
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  getUser() {
    this.api.getUserinfo().subscribe((res: any) => {
      this.userData = res;
      console.log(this.userData);
      
    });
  }
  onclickNotification(data: any) {
    let i = 0;
    let input = {
      notificationId: data,
    };
    this.api.readNotification(input).subscribe((res: any) => {
      this.toastr.success('You read this message');

      this.signalRService.getNotification();
      // this.signalRService.notification
    });
  }

  getAllServiceCategory() {
    this.userApi.getServiceCategory().subscribe((res: any) => {
      console.log(res);
      
      this.serviceData = res;
     
    });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {
      id: 2,
      class: 'second',
    });
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
  }
  
}
