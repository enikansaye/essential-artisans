import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit , TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { userProfileModel } from './components/customer/userprofile/userprofile.model';
import { ApiService } from './service/api.service';
import { EventBusService } from './service/event-bus.service';
import { LoaderService } from './service/loader.service';
import { LoginService } from './service/login.service';
import { SignalrService } from './service/signalr.service';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';


import { UserModel } from './shared/models/user.model';
import { UpdateService } from './update.service';
import { Platform } from '@angular/cdk/platform';
import { NgxLoader } from 'ngx-http-loader';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('scroll', [
      state('on', style({right: '-2500%'})),
      transition('* => *', [
        style({right: '-250%'}),
        animate(20000, style({right: '100%'}))
      ])
    ])
  ],
 
})
export class AppComponent implements OnInit {
  // title = 'artisan finder';
  user = {
    email: '',
    userName: '',
    id: 0,
  };
  offline: boolean = true;
  isOnline!: boolean;
  modalVersion!: boolean;
spinkit: any;
state = 0;

scrollDone() {
  this.state++;
}


  onNetwortStatusChange(){
    this.offline = !navigator.onLine;

  }


 
  userProfileModelObj: userProfileModel = new userProfileModel();
  loggedinUser1: any;
  displayAdmin: any;
  menuState!: string;
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  modalPwaEvent: any;
  modalPwaPlatform: string|undefined;
  public ngxloader = NgxLoader;
  constructor(
    public api: ApiService,
    private router: Router,
    public loader: LoaderService,
    private modalService: BsModalService,
    private updateService: UpdateService,
    public loginApi: LoginService,
    public signalRService: SignalrService,
    private swUpdate: SwUpdate,
    private platform: Platform,
    private meta: Meta, private title: Title
  ) {
   
    this.isOnline = false;
    this.modalVersion = false;


   this.updateService.checkForUpdate()
  }

  loading$ = this.loader.loading$;
  
  loggedinUser: any;
  userResponse: any;
  displayUser: any;
  displayArtisan: any;
  currentRole: any;

 

  ngOnInit(): void {
    this.roleDisplay();
    this.loginApi.loggedIn()
    this.onClick(this.userProfileModelObj.id)
    
    this.loginApi.getToken()
    this.loginApi.getToken();

    this.signalRService.startConnection();
    this.signalRService.addNotificationDataListener(); 
    this.signalRService.getNotification()
    
  
// service worker 
    this.onNetwortStatusChange();
    window.addEventListener('online', this.onNetwortStatusChange.bind(this));
    window.addEventListener('offline', this.onNetwortStatusChange.bind(this));

    // this.updateOnlineStatus();

    // window.addEventListener('online',  this.updateOnlineStatus.bind(this));
    // window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map((evt: any) => {
          // console.info(`currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`);
          this.modalVersion = true;
        }),
      );
    }

    this.loadModalPwa();

    this.meta.addTags([
      
      { name: 'description', content: "Artisan Nigeria is an online on-demand home and office maintenance marketplace and service provider. We connect skilled, verified and professional artisans (plumbers, electricians, AC repairers, Carpenters.) with individuals and organizations, and retail stores for affordable, convenient and automated end-to-end home and office maintenance services."},
{ name: "title", content: "Artisans in Lagos, Artisan services in Nigeria, Artisans Lagos | essentialartisans.ng"},
{ name:"keywords", content:"Artisans in Lagos, Lagos Artisans, Artisans services in Nigeria, Artisans Lagos, Plumbing, Plumber, Carpentry, Carpenter, AC repair, AC repairer, Electrical, Electrician, Installation, fixing"},
    { name:"viewport", content:"width=device-width, initial-scale=1.0" },

{charset: 'UTF-8'}    
]);
    this.setTitle('Essential Artisans')

  }
public setTitle(newTitle:string){
  this.title.setTitle(newTitle)
}
  

  private loadModalPwa(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }

  logo!: "/assets/images/logos.png";
  onClick(row:any){
    

    this.userProfileModelObj.id = row.id;
    

    // this.formValue.controls['name'].setValue(row.name);
  }
  public updateVersion(): void {
    window.location.reload();
    this.modalVersion = true;

  }

  public closeVersion(): void {
    this.modalVersion = true;
  }

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
}

  roleDisplay() {
    if (this.loginApi.getToken()!='') {
      this.currentRole = this.loginApi.haveaccess(this.loginApi.getToken());


      this.displayUser = this.currentRole === 'CUSTOMER';


      this.displayArtisan = this.currentRole === 'ARTISAN';
      this.displayAdmin = this.currentRole === 'ADMIN';
    }
  this.loginApi.loggedIn()
  }
  // openMenu() {
  //   this.menuVariable =! this.menuVariable;
  //   this.menu_icon_variable =! this.menu_icon_variable;
  // }

 

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {id: 2, class: 'second' });
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }
 
    this.modalRef.hide();
    this.modalRef = null;
  }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }
  Logout() {
    localStorage.removeItem('expiration');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('artisan');
    this.router.navigateByUrl('/signin');
    // })
}

}
