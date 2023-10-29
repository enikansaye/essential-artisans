import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/shared/admin.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() content !: string;
  @Output() cardClick: EventEmitter<void> = new EventEmitter<void>();

  text = '';
  serviceData : any;
  allServiceData : any;

  onCardClick(): void {
    this.cardClick.emit();
  }
 

  constructor(public data: UserService, private adminApi: AdminService,) { }

  ngOnInit() {
    this.adminApi.getServiceCategory().subscribe((res: any) => {
      
      this.allServiceData = res;
      this.serviceData = res.slice(3, this.allServiceData.length);

     
    });
  }

  getAllServiceCategory() {
    
  }

  checkthis(data : any){
    
    this.data.sendClickEvent(data.name)
    localStorage.setItem("name", data.name)
  }

}
