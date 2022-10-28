import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
profileForm!:FormGroup;
  constructor(private fb: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
    })
  }

  updateProfile(){
    this.userService.updateProfile(this.profileForm.value).subscribe(
      resp => {
        console.log(resp);
        
      }
    )
    
    
  }

}
