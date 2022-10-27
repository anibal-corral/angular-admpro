import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
  
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private router:Router,private fb: FormBuilder, private userService:UserService) { 
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      pwd:['',[Validators.required, Validators.minLength(3)]],
      rememberme:[false]
    })
  }

  ngOnInit(): void {
  }
login(){
  console.log(this.loginForm.value);
  if(!this.loginForm.valid)return;
this.userService.loginUser(this.loginForm.value).subscribe(
  (resp)=>{console.log(resp)},
  (err) => { Swal.fire("Error", err.error.msg,'error')}
)
  
  // this.router.navigateByUrl('/');
}
}
