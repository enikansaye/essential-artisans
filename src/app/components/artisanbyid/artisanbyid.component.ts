import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-artisanbyid',
  templateUrl: './artisanbyid.component.html',
  styleUrls: ['./artisanbyid.component.css']
})
export class ArtisanbyidComponent implements OnInit {

  accept: boolean = false;

  process: boolean = false

  service = 'completed';  
  othersData: any;
  totalRecord: any;
  page:number=1
  artisanData: any;
  constructor(private adminApi :AdminService) { }

  ngOnInit(): void {
  }
  clickEvent(){
    this.accept = !this.accept
  }
 

  getArtisanById(id:string){
    this.adminApi.getArtisanbyid(id).subscribe((res:any)=>{
      this.artisanData = res;
    })
  }

}
