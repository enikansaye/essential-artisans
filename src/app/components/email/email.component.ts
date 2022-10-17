import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AlertService } from 'ngx-alerts';
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
    private alertService: AlertService
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
        this.alertService.success('Email Confirmed');

        this.emailConfirmed = true;
        this.router.navigate(['/signin']);
      },
      (error) => {

        this.alertService.danger('unable to confirm email');

        this.emailConfirmed = false;
      }
    );
  }
}
