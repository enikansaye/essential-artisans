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
  user ={
    email:'',
    userName:'',
    id: 0
  }

  constructor( public api : ApiService,   private router: Router,){}
loggedinUser: any
userResponse: any
  
  ngOnInit(): void {

  // this.loggedin()
  }
  // loggedin(){
    
  //   this.userResponse = localStorage.getItem('token')
  //   this.loggedinUser = JSON.parse(this.userResponse).data
 
  
  //  return this.loggedinUser
  // }
  logout(){
    this.router.navigate(['/']);
    return localStorage.removeItem('user')
   
  }

}
