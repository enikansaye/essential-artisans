import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm !: FormGroup
  hide = true;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api : ApiService) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email:['', Validators.required,Validators.email],
      password:['', Validators.required]
    })
  }

//   signin(){
//     this.http.get<any>("http://localhost:3000/signupUser")
//     .subscribe(res=>{
//       const user = res.find((a:any)=>{
//         return a.email ===this.signinForm.value.email && a.password === this.signinForm.value.password
//       });
//       if (user){
//         alert("you are logged in")
//         this.signinForm.reset();
//         this.router.navigate(['/home'])
//       } else{
//         alert('user not found')
//       }
//     },err =>{
// alert("username and password not correct")
//     } )
//   }

  signin() {
    // console.log(this.signupForm.value);
    this.api.signinUser(this.signinForm.value).subscribe((res) => {
      alert(res.status);
      console.log(res);
      this.signinForm.reset();
      this.router.navigate(['/dashboard']);
    });

    
  }

}
