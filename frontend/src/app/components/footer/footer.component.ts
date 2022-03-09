import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 apple : string = "../assets/images/appleplay.png";
  google : string = "../assets/images/googleplay.png";

  constructor() { }

  ngOnInit(): void {
  }

}
