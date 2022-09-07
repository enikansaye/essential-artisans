import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/shared/admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



searchForm!: FormGroup
  searchArtisan: any;
  location: any;
  serviceData: any;
  serviceCategories: any;
  state2: any;
  city2: any;

  constructor(private api: ApiService, private adminApi:AdminService,private data: UserService,private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.getState()
    // this.showArtisan()
    this.getAllServiceCategory() ;
    this.searchForm = this.formBuilder.group({
      state:[''],
      city:[''] 
    })
  }
text =''
  clickMe(data:string){
    console.log(data);
    // this.text =  this.data.update(this.text)

    this.data.sendClickEvent(this.text);
    // this.data.sendClickEvent()
    this.text =data
    console.log(data);
    
  }
  updateText(data:any){
    console.log(data);
    
    this.data.update(this.text)
  }

 



getState(){
  this.api.getLocation().subscribe((data:any)=>{
    this.state2= data
    console.log( this.state2);
    
  })
}
onChangeState(event:any){
  let userProfile =this.searchForm.controls['state'].value
  if(userProfile){
    this.api.getLocation2(userProfile).subscribe((data:any)=>{
      this. city2= data
      console.log( this.city2);
  })
}
}
onChangeCity(event:any){
return this.searchForm.controls['city'].value

}

  onLocationFilter() {
    this.api.sortArtisanLocation(this.searchForm.value).subscribe((data:any)=>{
      console.log(data);
      
    })
  }


  getAllServiceCategory() {
    this.adminApi.getServiceCategory().subscribe((res: any) => {
      this.serviceData = res;
      console.log(res.name);
      
    });
  }
 
  getArtisan(name:any){
    this.api.getArtisanByService(name).subscribe((res:any) =>{
      console.log(res);
      
    })

  }

}



