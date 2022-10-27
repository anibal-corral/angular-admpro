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
  name:['',[Validators.required, Validators.minLength(3)]],
  email:['',[Validators.required, Validators.email]],
  pwd:['',[Validators.required, Validators.minLength(3)]],
  pwd2:['',[Validators.required, Validators.minLength(3)]],
  terms:[false,[Validators.required]],

})
formSubmitted = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if(this.registerForm.valid){
      console.log('Sending data');
    }else{
      console.log("Form is not valid");
      
    }
  }
validField(field:string){
  if(this.registerForm.get(field)?.invalid && this.formSubmitted==true){
    return true;
  }else{
    return false;
  }

}
termsAccepted(){
  return !this.registerForm.get('terms')?.value && this.formSubmitted;
}
}
