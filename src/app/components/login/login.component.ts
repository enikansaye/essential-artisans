import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm !: FormGroup
  hide = true;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email:['', Validators.required,Validators.email],
      password:['', Validators.required]
    })
  }

  signin(){

    // this.http.post("http://localhost:3000/profile", this.signinForm.getRawValue(), {withCredentials:true})
    // .subscribe((res)=>{
    //   this.router.navigate(['home'])
    //   console.log(res)
    // })
    
    this.http.get<any>("http://localhost:3000/signupUser")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email ===this.signinForm.value.email && a.password === this.signinForm.value.password
      });
      if (user){
        alert("you are logged in")
        this.signinForm.reset();
        this.router.navigate(['/home'])
      } else{
        alert('user not found')
      }
    },err =>{
alert("username and password not correct")
    } )
  }

}
