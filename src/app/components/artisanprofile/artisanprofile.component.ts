import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-artisanprofile',
  templateUrl: './artisanprofile.component.html',
  styleUrls: ['./artisanprofile.component.css']
})
export class ArtisanprofileComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav !: MatSidenav;

  expression = 'match1';

  service = 'completed';

  constructor(private observer : BreakpointObserver) { }


  ngOnInit(): void {
  }
ngAfterViewInit(){
  this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
    if(res.matches){
      this.sidenav.mode = 'over';
      this.sidenav.close();
    }else{
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  })
}

}
