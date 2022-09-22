import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private subject = new Subject<any>();
  // private content = new BehaviorSubject<string>('')
  // public share = this.content.asObservable();
// service=''
checkData:any
checkArtisan:any
  sendClickEvent(text:any){
    
    this.api.getArtisanByService(text).subscribe((res:any) =>{
      console.log(res);

      this.checkData =res
      this.subject.next(text);
    })
    
  }

 
  getClickEvent():Observable<any>{
    return this.subject.asObservable();

  }

  constructor(private http:HttpClient,private api: ApiService) {}

  
}
