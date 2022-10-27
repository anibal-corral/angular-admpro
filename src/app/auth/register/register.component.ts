import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent implements OnInit {
public registerForm = this.fb.group({
  name:['Doctor Jekyll',[Validators.required, Validators.minLength(3)]],
  email:['drjekyll@aecs.com',[Validators.required, Validators.email]],
  pwd:['123',[Validators.required, Validators.minLength(3)]],
  pwd2:['123',[Validators.required, Validators.minLength(3)]],
  terms:[false,[Validators.required]],

})
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createUser(){
    console.log(this.registerForm.value);
  }

}
