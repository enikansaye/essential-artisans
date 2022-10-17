import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { LoginService } from 'src/app/service/login.service';
import { Emitters } from 'src/emitters/emitters';
import { userProfileModel } from '../userprofile/userprofile.model';
// import { MenuItem } from './menu-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  userProfileModelObj: userProfileModel = new userProfileModel();
  
  searchTerm: any;
  term!:string;
  total:any = 0;
  // results: IGetArticleModel[];
  perPage: number = 10;
  filter: any = "search-by-topic-name";
  pageNumber:number = 1;

  searchBarVisible: boolean = true;
  showBar: boolean = false;
  show: boolean = false;
  public signinForm !: FormGroup;
  authenticated = false;

  loggedinUser: any;
  userResponse: any;
  displayUser: any;
  displayArtisan: any;
  currentRole: any;
  displayAdmin: any;


  constructor(private formBuilder: FormBuilder,public api: ApiService,
    private http : HttpClient,private route: ActivatedRoute, private router: Router, public loginApi:LoginService) { }
  ngOnInit(): void {
    this.roleDisplay();
    this.loginApi.loggedIn()
    this.onClick(this.userProfileModelObj.id)
    
    
  }

  onClick(row:any){
    
    
        this.userProfileModelObj.id = row.id;
        
    
        // this.formValue.controls['name'].setValue(row.name);
      }

      roleDisplay(){
        if (this.loginApi.getToken()!='') {
          this.currentRole = this.loginApi.haveaccess(this.loginApi.getToken());
    
    
          this.displayUser = this.currentRole === 'CUSTOMER';
    
    
          this.displayArtisan = this.currentRole === 'ARTISAN';
          this.displayAdmin = this.currentRole === 'ADMIN';
        }
      this.loginApi.loggedIn()
      }

      logout() {
        // this.router.navigate(['/']);
        localStorage.removeItem('accesstoken')
        return localStorage.removeItem('token');
      }

 menuItems = [
    {
      // buttonClickValue:this.logout,
      label: 'Help',
      icon: 'help',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      routeLink: 'helpcenter',
      
    },
   
   
    {
      label: 'Sign In',
      icon: 'login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      routeLink: 'signin',
      // buttonClickValue:this.logout
    },

    {
      label: 'Profile',
      icon: 'person',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      routeLink: 'userprofile',
      
      
    },
    {
      label: 'Logout',
      icon: 'logout',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      buttonClickValue: this.logout,
      routeLink: '/',
      
    },
  ];


  isShowDivIf = true;
  toggleDisplayDivIf(){
    this.isShowDivIf = !this.isShowDivIf;
  }





  search():void{
    if(this.searchTerm)
      this.router.navigateByUrl('articles/search/' + this.searchTerm)
  }

  
}


