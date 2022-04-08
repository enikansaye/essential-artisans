import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // slidesStore !: string

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  image1 : string = "../assets/images/Ac1.svg";
  image2 : string = "../assets/images/electrical_20201027.svg";
  image3 : string = "../assets/images/carpentry.svg";
  image4 : string = "../assets/images/0thers08.png";
  image5 : string = "../assets/images/electrical.svg";
  image6 : string = "../assets/images/iphone.png";

  constructor() { }

  ngOnInit(): void {
  }



}
