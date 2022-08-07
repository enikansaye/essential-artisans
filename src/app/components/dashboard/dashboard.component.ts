import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';


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
  searchArtisan: any;
  location: any;

  constructor(private api: ApiService,) { }

  ngOnInit(): void {
    this.showAll()
  }

  selectedCountry: any = {
    id: 0,
    name: '',
    cities: '',
  };
  countries: any;
  states: any;

  showAll() {
    this.api.getAll().subscribe((data: any, i: any) => {
      const result = Object.entries(data);

      this.countries = data;
    });
  }

  onSelect(data: any) {
    let result = Object.entries(this.countries);
    console.log(data.value);

    const statesList = Object.values(result[data.value])[1];

    console.log((statesList as any)['cities']);
    this.states = (statesList as any)['cities'];

    console.log(this.states);
  }

  onSelectCities(data: any) {
    let result = Object.entries(this.countries);
    console.log(data.value);

    const statesList = Object.values(result[data.value])[1];

    console.log((statesList as any)['cities']);
    this.states = (statesList as any)['cities'];

    console.log(this.states);
  }

  onLocationFilter() {
    this.searchArtisan = this.location;
  }
}



