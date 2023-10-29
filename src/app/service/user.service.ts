import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private subject = new Subject<any>();
  
  checkData: any;
  checkArtisan: any;
  sendClickEvent(text: any) {
    this.api.getArtisanByService(text).subscribe((res: any) => {

      this.checkData = res;
      

      this.subject.next(text);
      // localStorage.setItem("artisan", JSON.stringify(this.checkData))
      if(this.checkData === null){

      }else{
        localStorage.setItem("artisan", "yes")

      }
    });
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router
  ) {}
}
