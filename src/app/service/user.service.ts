import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private subject = new Subject<void>();
  private content = new BehaviorSubject<string>('')
  public share = this.content.asObservable();
// service=''
  sendClickEvent(text:any){
    this.subject.next(text);
  }
  update(text:any){
    this.content.next(text)

  }

  getClickEvent():Observable<any>{
    return this.subject.asObservable();

  }

  constructor() {}

  
}
