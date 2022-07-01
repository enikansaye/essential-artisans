import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Emitters } from 'src/emitters/emitters';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public signinForm !: FormGroup;
  authenticated = false;
  currentRole: any;
  displayUser: any;
  displayArtisan: any;
  loggedinUser1: any;
  displayAdmin: any;

  constructor(private formBuilder: FormBuilder, public api: ApiService,
    private router: Router,) { }

  ngOnInit(): void {
    this.roleDisplay();
    this.api.loggedIn()
    // Emitters.authEmitter.subscribe(
    //  ( auth:boolean)=>{
    //    this.authenticated = auth

    //  }
    // )
 
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


