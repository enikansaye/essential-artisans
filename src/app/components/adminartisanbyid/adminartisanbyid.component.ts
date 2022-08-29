import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-adminartisanbyid',
  templateUrl: './adminartisanbyid.component.html',
  styleUrls: ['./adminartisanbyid.component.css']
})
export class AdminartisanbyidComponent implements OnInit {
  accept: boolean = false;
  othersData: any;
  totalRecord: any;
  service = 'completed';  
  page:number=1
  artisanData: any;

  constructor(private adminApi :AdminService ) { }

  ngOnInit(): void {

    // this.getArtisanById()
  }
  clickEvent(){
    this.accept = !this.accept
  }
  getAllOthers() {
    // this.adminApi.getOthers().subscribe((res: any) => {
    //   this.othersData = res;
    //   console.log(this.othersData)
    //   this.totalRecord=res.length;
    //   console.log(this.totalRecord);
    // });
  }

  getArtisanById(id:string){
    this.adminApi.getArtisanbyid(id).subscribe((res:any)=>{
      this.artisanData = res;
    })
  }
}
