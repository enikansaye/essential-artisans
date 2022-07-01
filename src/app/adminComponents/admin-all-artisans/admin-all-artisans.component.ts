import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-admin-all-artisans',
  templateUrl: './admin-all-artisans.component.html',
  styleUrls: ['./admin-all-artisans.component.css']
})
export class AdminAllArtisansComponent implements OnInit {
  userData: any;
  

  totalRecord: any;
  page:number=1
  artisanData: any;

  length!: number;
  pageIndex!: number;
  pageSize!: number;
  constructor( private adminApi: AdminService) { }

  ngOnInit(): void {
    this.getAllArtisan();
  }
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  getAllArtisan() {
    this.adminApi.getArtisan().subscribe((res: any) => {
      this.artisanData = res;
      console.log(this.artisanData)
      this.totalRecord=res.length;
      console.log(this.totalRecord);
    });
  }

  deleteArtisan(id:number){
    this.adminApi.deleteArtisan(id).subscribe((res:any)=>{
      alert('artisan deleted')
     this.getAllArtisan();
    })
  }
}
