import { Component, OnInit } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
})
export class ModalImageComponent implements OnInit {
  // user!:User;
  profilePicture!:File;
  profilePicturePreview:string|ArrayBuffer|null =null;
  constructor(public modalImageService:ModalImageService,private fileUploadService:FileuploadService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.profilePicturePreview=null;
    this.modalImageService.closeModal();
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
    updateProfilePicture(){
      const id = this.modalImageService.id;
      const type = this.modalImageService.type;

      this.fileUploadService.updateProfilePicture(this.profilePicture,type,id||'')
        .then(img=> {
          Swal.fire('Success','Changes saved successfully','success' );
          this.modalImageService.newImage.emit(img);
          console.log(img);
          this.closeModal();
        }).catch((err)=>
          Swal.fire('Error', 'Error','error')
          )
    
    
      }
}
