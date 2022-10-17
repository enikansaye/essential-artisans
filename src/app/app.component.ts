import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit , TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { userProfileModel } from './components/userprofile/userprofile.model';
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
  offline: boolean = true;
  isOnline!: boolean;
  modalVersion!: boolean;


  onNetwortStatusChange(){
    this.offline = !navigator.onLine;
    // this.isOnline = window.navigator.onLine;
    // console.info(`isOnline=[${this.isOnline}]`);
  }

  // private updateOnlineStatus(): void {
  //   this.isOnline = window.navigator.onLine;
  //   console.info(`isOnline=[${this.isOnline}]`);
  // }
 
  userProfileModelObj: userProfileModel = new userProfileModel();
  loggedinUser1: any;
  displayAdmin: any;
  menuState!: string;
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  modalPwaEvent: any;
  modalPwaPlatform: string|undefined;
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
  ) {
    this.isOnline = false;
    this.modalVersion = false;


    updateService.checkForUpdate()
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
    // this.onNetwortStatusChange();
    window.addEventListener('online', this.onNetwortStatusChange.bind(this));
    window.addEventListener('offline', this.onNetwortStatusChange.bind(this));

    // this.updateOnlineStatus();

    // window.addEventListener('online',  this.updateOnlineStatus.bind(this));
    // window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map((evt: any) => {
          console.info(`currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`);
          this.modalVersion = true;
        }),
      );
    }

    this.loadModalPwa();

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
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion(): void {
    this.modalVersion = false;
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
    // this.loginApi.logoutUser().subscribe(()=>{
  localStorage.clear();
  // localStorage.removeItem('expiration');
  // localStorage.removeItem('refreshtoken');
  this.router.navigateByUrl('/signin');
    // })
}

}
