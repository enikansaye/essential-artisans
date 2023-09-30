import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  email: any;
  urlParams: any = {};
  emailConfirmed: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,

  ) // private progressbar: ProgressbarService
  {}

  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    this.getEmailData();
  }
  getEmailData() {
    this.api.confirmEmail(this.urlParams).subscribe(
      () => {
        this.toastr.success('Email Confirmed');

        this.emailConfirmed = true;
        this.router.navigate(['/signin']);
      },
      (error) => {

        this.toastr.warning('unable to confirm email');

        this.emailConfirmed = false;
      }
    );

    const referrer = document.referrer;

    if (referrer.includes("auth/verify-email?token")) {
     //Do your stuff
    } else {
      this.router.navigate(['/page not found']);
    }
  }
}
