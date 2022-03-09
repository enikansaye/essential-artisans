import { HttpClient } from '@angular/common/http';
import {Emitters} from "src/emitters/emitters"
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message ="";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/profile", {withCredentials:true})
    .subscribe((res)=>{
      this.message = 'you are logged in'
      Emitters.authEmitter.emit(true);
    },
    err=>{
      this.message = "you are not login"
      Emitters.authEmitter.emit(false);

    })

  }

}
