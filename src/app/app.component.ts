import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import { UserModel } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'artisan finder'

  constructor( private api : ApiService,   private router: Router,){}
loggedinUser: any
user: any
  // userInfo!: UserModel;
  ngOnInit(): void {
  //  this.api.userProfile.subscribe((data)=>{
  //    this.userInfo = this.loggedinUser;
  //  })
  this.loggedin()
  }
  loggedin(){
    // console.log(this.loggedinUser)
    this.loggedinUser = localStorage.getItem('token')
  //  this.loggedinUser =JSON.parse(JSON.stringify(localStorage.getItem('token'))).data.email
  
   return this.loggedinUser
  }
  logout(){
    this.router.navigate(['/dashboard']);
    return localStorage.removeItem('token')
   
  }

}
