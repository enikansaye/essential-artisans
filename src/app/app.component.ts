import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { UserModel } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'artisan finder'

  constructor( private api : ApiService){}

  userInfo?: UserModel;
  ngOnInit(): void {
   this.api.userProfile.subscribe((data)=>{
     this.userInfo = data;
   })
  }

}
