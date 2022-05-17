import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/emitters/emitters';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public signinForm !: FormGroup;
  authenticated = false;

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
     ( auth:boolean)=>{
       this.authenticated = auth

     }
    )
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
        password: ['', Validators.required]
    })
  }

  signin(){
    this.http.get<any>("http://localhost:3000/signupUser")
  .subscribe(res =>{
    const user = res.find((a:any) =>{
      return a.email ===this.signinForm.value.email && a.password ===this.signinForm.value.password
    });
    if(user){
      alert('login success');
      this.signinForm.reset()
      let ref = document.getElementById('cancel'); //this is to close the modal form automatically
        ref?.click();
      this.router.navigate(['home'])
    } else {
      alert("user not found")
    }(err: any) =>{
      alert("something went wrong")
    }
  })
  }
  logout(){
    this.http.post("http://localhost:3000/signupUser", {withCredentials:true})
    .subscribe(()=>{
      // this.
    }, err=>{

    })
  }

  
}
  // let authflow = this.api.login(this.signinForm)
  // .pipe(
  //   switchMap(() => this.api.profile())
  // )
  // authflow.subscribe({
  //   next: (user: UserModel) =>{
  //     this.api.saveUserToLocalStorage(user)
  //   },
  //   error: (err) =>{
  //     alert('login failed')
  //   }
  // })


  //  userProfile: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
    //     id: 0,
    //     userName: '',
    //     email: '',
    //     phone: '',
    //     password: ''
    //   });
    
    //   profile() {
    //     return this.http.get<UserModel>(this.authUrl, {
    //       withCredentials: true,
    //     });
    //   }
    
    //   saveUserToLocalStorage(user: UserModel){
    // this.userProfile.next(user)
    // localStorage.setItem('user-profile', JSON.stringify(user))
    //   };