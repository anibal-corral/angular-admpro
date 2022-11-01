import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';
import { SearchsService } from '../../../services/searchs.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {
  totalUsers:number=0;
  doctors:Doctor[] = [];
  doctorsTMP:Doctor[] = [];
  from:number = 0;
  loading:boolean=true;
  imgSubs: Subscription = new Subscription;

  constructor(private doctorService:DoctorService, 
    private modalImageService: ModalImageService,
    private doctorSearchService:SearchsService
    ) { }

ngOnInit(): void {
this.loadDoctors();
this.imgSubs= this.modalImageService.newImage.pipe(
delay(1000)
)
.subscribe(()=>this.loadDoctors())

}
ngOnDestroy(): void {
this.imgSubs.unsubscribe();
}
loadDoctors(){
this.loading=true;
this.doctorService.getDoctors().subscribe(doctors => {
// console.log(doctors);

this.doctors=doctors; this.loading=false
});
}

updateDoctor(doctor:Doctor){
console.log('Updating');
this.doctorService.updateDoctor(doctor).subscribe(
(resp)=>{
Swal.fire('Success','Changes saved', 'success')
},
(err)=>{
Swal.fire('Error', 'Error saving doctor ' + err, 'error')
}
);

}
deleteDoctor(doctor:Doctor){

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    // confirmButtonColor: '#3085d6',
    // cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.doctorService.deleteDoctor(doctor.uid).subscribe(
        (resp) => {
          Swal.fire(
          'User deleted',
          `${doctor.name} has been deleted`,
          'success'
        );
      this.loadDoctors();
    },
        (error) => Swal.fire(
          'Error',
          `Error ${error}`,
          'error'
        ), 
      )
      
    }
  })


}




openModal(doctor:Doctor){
this.modalImageService.openModal('doctors',doctor.uid||'',doctor.img);
}

search(term:string){
if(term.length===0){
return this.doctors = this.doctorsTMP;
}else{
return this.doctorSearchService.search('doctors',term).subscribe( result => 
{
this.doctors = result as Doctor[]
}
);
}


}

}
