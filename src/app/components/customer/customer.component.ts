import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { SignalrService } from 'src/app/service/signalr.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  userData  : any
  constructor( private api : ApiService,
    private observer: BreakpointObserver,

    private toastr : ToastrService,
    public signalRService: SignalrService
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
  
}
