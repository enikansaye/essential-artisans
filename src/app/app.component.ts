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
import { StorageService } from './service/storage.service';

import { UserModel } from './shared/models/user.model';
import { UpdateService } from './update.service';

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

  onNetwortStatusChange(){
    this.offline = !navigator.onLine
  }
 
  userProfileModelObj: userProfileModel = new userProfileModel();
  loggedinUser1: any;
  displayAdmin: any;
  menuState!: string;
  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  constructor(
    public api: ApiService,
    private router: Router,
    public loader: LoaderService,
    private modalService: BsModalService,
    private updateService: UpdateService,
    public loginApi: LoginService,
    public signalRService: SignalrService,
  ) {updateService.checkForUpdate()}

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
    
    // this.api.getNotification().subscribe((res:any)=>{
    //   this.notificationCount = res.countOfNotifications
    //   localStorage.setItem('notifyCount', this.notificationCount)
    //   localStorage.setItem('alldatacount', res.userNotifications[0].notificationText);


    //   console.log(this.notificationCount);
      
    //   console.log(res);
      
    // })
    // this.api.readNotification().subscribe((res:any)=>{
    //   // this.notificationMessage = res
    //   console.log(res);
      
    // })

    this.onNetwortStatusChange();
    window.addEventListener('online', this.onNetwortStatusChange.bind(this))
    window.addEventListener('offline', this.onNetwortStatusChange.bind(this))

  }
  logo!: "/assets/images/logos.png";
  onClick(row:any){
    
console.log(row);

    this.userProfileModelObj.id = row.id;
    console.log(this.userProfileModelObj.id);
    

    // this.formValue.controls['name'].setValue(row.name);
  }

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
}

  roleDisplay() {
    if (this.loginApi.getToken()!='') {
      this.currentRole = this.loginApi.haveaccess(this.loginApi.getToken());

      console.log(this.currentRole);

      this.displayUser = this.currentRole === 'CUSTOMER';

      console.log(this.displayUser);

      this.displayArtisan = this.currentRole === 'ARTISAN';
      console.log(this.displayArtisan);
      this.displayAdmin = this.currentRole === 'ADMIN';
      console.log(this.displayAdmin);
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


}
