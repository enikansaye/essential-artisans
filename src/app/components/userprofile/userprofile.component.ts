import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav !: MatSidenav;

  expression = 'match1'

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
