import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { FileuploadService } from '../../services/fileupload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
profileForm!:FormGroup;
user!:User;
profilePicture!:File;
profilePicturePreview:string|ArrayBuffer|null =null;

  constructor(private fb: FormBuilder, private userService:UserService, private fileUploadService:FileuploadService) {
    this.user = userService.user;
   }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name:[this.user.name,Validators.required],
      email:[this.user.email,[Validators.required, Validators.email]],
    })
  }

  updateProfile(){
    this.userService.updateProfile(this.profileForm.value).subscribe(
      (resp:any )=> {
        console.log(resp);
        const {email, name, google, role, uid} = resp.user;
        this.user.email=email;
        this.user.name=name;
        this.user.google=google;
        this.user.role=role;
        this.user.uid=uid;
       Swal.fire('Success','Changes saved successfully','success' );
      },(err)=>{
        Swal.fire('Error', err.error.msg,'error');
        
        
      }
    )
    
    
  }
  updateProfilePicture(){
  this.fileUploadService.updateProfilePicture(this.profilePicture,'users',this.user.uid||'')
    .then(resp => 
      this.user.img=resp
      ).then(()=> Swal.fire('Success','Changes saved successfully','success' )).catch((err)=>
      Swal.fire('Error', 'Error','error')
      )


  }

  changeImg(file:any){
  this.profilePicture = file 
  if(!file){
    this.profilePicturePreview=null;
    return;
  }
  

  const reader = new FileReader();
  const url64 = reader.readAsDataURL(file);
  reader.onloadend =() =>
  {
    this.profilePicturePreview = reader.result;
    //  console.log(reader.result);
    
  }
    // console.log(event);
    
  }

}
