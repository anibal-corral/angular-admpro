import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
  
})
export class LoginComponent implements OnInit, AfterViewInit {

@ViewChild('googleBtn') googleBtn!:ElementRef;

  loginForm!: FormGroup;
  constructor(private router:Router,private fb: FormBuilder, private userService:UserService) { 
    this.loginForm = this.fb.group({
      email:[ localStorage.getItem('email')||'',[Validators.required, Validators.email]],
      pwd:['',[Validators.required, Validators.minLength(3)]],
      rememberme:[false]
    })
  }
  ngAfterViewInit(): void {
    this.googleInit();
  }
  googleInit(){
    google.accounts.id.initialize({
      client_id: "987550744353-rq2hkv2nr2fuhrbge1cks8l74c7ttcdh.apps.googleusercontent.com",
      // callback: this.handleCredentialResponse
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

  }
  handleCredentialResponse(response:any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.userService.loginGoogle(response.credential).subscribe((resp)=>{
      this.router.navigateByUrl('/');
    })
  }
  ngOnInit(): void {
  }
login(){
  // console.log(this.loginForm.value);
  if(!this.loginForm.valid)return;
this.userService.loginUser(this.loginForm.value).subscribe(
  (resp)=>{
    if(this.loginForm.get('rememberme')?.value){
      localStorage.setItem('email',this.loginForm.get('email')?.value);
    }else{
      localStorage.removeItem('email');
    }
   this.router.navigateByUrl('/');
  },
  (err) => { Swal.fire("Error", err.error.msg,'error')}
)
  
  
}
}
