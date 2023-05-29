import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/admin.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-artisans',
  templateUrl: './artisans.component.html',
  styleUrls: ['./artisans.component.css']
})
export class ArtisansComponent implements OnInit {
  artisanData: any;
  totalRecord: any;
  artisanLength: any;
  artisanId: any;
  pendingArtisans: any;
  pendingArtisanRecord: any;
  artisanErrorMessage: any;
  quotePendingError: any;
  value !: string;
  artisanPage: any
  searchText: any
  quotePage = 1;

  constructor(
    private adminApi: AdminService,
    private toastr: ToastrService,


  ) { }

  ngOnInit(): void {
    this.getAllArtisan();

  }
  getAllArtisan() {
    this.adminApi.getArtisan().subscribe((res: any) => {
      
      
      this.artisanData = res;
      this.totalRecord = res.length;
      this.artisanLength = res.length;
      return this.artisanData.reverse();
    });
  }

  approveArtisan(row: any) {
    this.artisanId = row.id;

    this.adminApi
      .aproveArtisanUrl(this.artisanId, row.id)
      .subscribe((res: any) => {
        this.toastr.success('Artisan Approved');
        this.getAllPendingArtisan();
        this.getAllArtisan();
      });
    this.artisanErrorMessage;
  }

  suspendArtisan(row: any) {
    this.artisanId = row.id;

    const registerObserver = {
      next: (res: any) => {
        this.toastr.success('Artisan Suspended');
        this.getAllArtisan();
      },
      error: (err: any) => {
        this.toastr.warning('Signup failed');

        return (this.quotePendingError = err.error);
      },
    };

    this.adminApi
      .suspendArtisanUrl(this.artisanId, row.id)
      .subscribe(registerObserver);
  }
  deleteArtisan(row: any) {
    this.artisanId = row.id;
    const registerObserver = {
      next: (res: any) => {
        this.toastr.success('Artisan Deleted');
        this.getAllArtisan();
      },
      error: (err: any) => {
        this.toastr.warning('Something went Wrong!!!');

        return (this.quotePendingError = err.error);
      },
    };
    this.adminApi
      .deleteArtisanUrl(this.artisanId, row.id)
      .subscribe(registerObserver);
  }

  Search(event: any) {
    if (this.value == '') {
      this.getAllArtisan();
    } else {
      this.artisanData = this.artisanData.filter((res: any) => {
        return res.firstName
          .toLocaleLowerCase()
          .match(this.value.toLocaleLowerCase());
      });
    }
  }

  getAllPendingArtisan() {
    const registerObserver = {
      next: (res: any) => {
        this.pendingArtisans = res;
        this.pendingArtisanRecord = res.length;
      },
      error: (err: any) => {
        return (this.artisanErrorMessage = err.error);
      },
    };
    this.adminApi.getPendingArtisan().subscribe(registerObserver);
  }

  getArtisanById(id: string) {
    this.adminApi.getArtisanbyid(id).subscribe((res: any) => {
      this.artisanData = res;
    });
  }

}
