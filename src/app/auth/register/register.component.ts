import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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

}, {
  validators: this.equalPwds('pwd','pwd2')
})
formSubmitted = false;
  constructor(private fb: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
  }

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if(!this.registerForm.valid)return;
    this.userService.createUser(this.registerForm.value).subscribe(
      (resp) => {console.log('Respuesta'); console.log(resp);},(err) => console.warn(err)
    )
      
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
validatePwd(){
  const pwd1 = this.registerForm.get('pwd')?.value;
  const pwd2 = this.registerForm.get('pwd2')?.value;
  if((pwd1!==pwd2) && this.formSubmitted==true) { return false}else{return true};


}
equalPwds(pwd: string, pwd2: string){
  return (formGroup: FormGroup) => {
    const pwdControl = formGroup.get(pwd);
    const pwdControl2 = formGroup.get(pwd2);
    if(pwdControl?.value === pwdControl2?.value){
      pwdControl?.setErrors(null);
      pwdControl2?.setErrors(null);
    }else{
      pwdControl2?.setErrors({notEqual:true})
    }
  }
  
}
}
 

