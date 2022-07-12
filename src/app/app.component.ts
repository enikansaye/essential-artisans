import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userProfileModel } from './components/userprofile/userprofile.model';
import { ApiService } from './service/api.service';
import { EventBusService } from './service/event-bus.service';
import { LoaderService } from './service/loader.service';
import { StorageService } from './service/storage.service';

import { UserModel } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'artisan finder';
  user = {
    email: '',
    userName: '',
    id: 0,
  };

  userProfileModelObj: userProfileModel = new userProfileModel();
  loggedinUser1: any;
  displayAdmin: any;

  constructor(
    public api: ApiService,
    private router: Router,
    public loader: LoaderService
    
  ) {}

  loading$ = this.loader.loading$;
  
  loggedinUser: any;
  userResponse: any;
  displayUser: any;
  displayArtisan: any;
  currentRole: any;

  ngOnInit(): void {
    this.roleDisplay();
    this.api.loggedIn()
    this.onClick(this.userProfileModelObj.id)
    
    // this.api.getToken()
    // this.api.getUserToken();

  }
  onClick(row:any){
    
console.log(row);

    this.userProfileModelObj.id = row.id;
    console.log(this.userProfileModelObj.id);
    

    // this.formValue.controls['name'].setValue(row.name);
  }

 

  roleDisplay() {
    if (this.api.getUserToken()!='') {
      this.currentRole = this.api.haveaccess(this.api.getUserToken());

      console.log(this.currentRole);

      this.displayUser = this.currentRole === 'CUSTOMER';

      console.log(this.displayUser);

      this.displayArtisan = this.currentRole === 'ARTISAN';
      console.log(this.displayArtisan);
      this.displayAdmin = this.currentRole === 'ADMIN';
      console.log(this.displayAdmin);
    }
  this.api.loggedIn()
  }

  logout() {
    this.router.navigate(['/']);
    localStorage.removeItem('accesstoken')
    return localStorage.removeItem('token');
  }

  menuVisible = false;
toggleMenu() {
  this.menuVisible = !this.menuVisible;
}
}
