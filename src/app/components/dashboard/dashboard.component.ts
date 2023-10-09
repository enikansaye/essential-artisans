import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/shared/admin.service';

interface Data {
  id: string;
  name: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;


  searchForm!: FormGroup;
  searchArtisan: any;
  location: any;
  serviceData : any;
  allServiceData : any;
  serviceSubCategory : any;
  displaySubcategories = false;

  
  serviceCategories: any;
  state2: any;
  city2: any;
  constructor(
    private api: ApiService,
    private adminApi: AdminService,
    public data: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getState();
    this.getAllServiceCategory();
    this.searchForm = this.formBuilder.group({
      state: [''],
      city: [''],
    });
  }
  text = '';
  clickMe(data: string) {
    this.data.sendClickEvent(this.text);
    this.text = data;
  }

  getState() {
    this.api.getLocation().subscribe((data: any) => {
      this.state2 = data;
    });
  }
  onChangeState(event: any) {
    let userProfile = this.searchForm.controls['state'].value;
    if (userProfile) {
      this.api.getLocation2(userProfile).subscribe((data: any) => {
        this.city2 = data;
      });
    }
  }
  onChangeCity(event: any) {
    return this.searchForm.controls['city'].value;
  }

  onLocationFilter() {
    this.api
      .sortArtisanLocation(this.searchForm.value)
      .subscribe((data: any) => {});
  }

  getAllServiceCategory() {
    this.adminApi.getServiceCategory().subscribe((res: any) => {
      console.log(res);
      
      this.serviceData = res.slice(0,3);
      this.allServiceData = res;
     
    });
  }

  getArtisan(name: any) {
    this.api.getArtisanByService(name).subscribe((res: any) => {
    });
  }
  hope3: any;
  onChangeService(event: any) {
    this.hope3 = `${event.value}`;
    // this.router.navigate(['/available artisan']);
  }

  toggleSection(card:any): void {
    console.log(card);
    
    card.name = !card.name;
  }

  toggleSubcategories(data :any): void {
    console.log(data.subCategories);
    this.serviceSubCategory = (data.subCategories)
    
  }
  checkToggle(){
    this.displaySubcategories = !this.displaySubcategories;

  }
  checkthis(data : any){
    console.log(data);
    
    this.data.sendClickEvent(data.name)
    localStorage.setItem("name", data.name)
  }
}
