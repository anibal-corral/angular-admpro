import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { Doctor } from '../../../../models/doctor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { ModalImageService } from '../../../../services/modal-image.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {
  hospitals:Hospital[]=[];
  selectedHospital: Hospital | undefined;
  selectedDoctor:Doctor|undefined;
  doctorForm!:FormGroup;
  imgSubs: Subscription = new Subscription;
  constructor(
    private fb:FormBuilder,
    private hospitalService:HospitalService,
    private doctorService:DoctorService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private modalImageService:ModalImageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id})=>this.loadDoctor(id));
    this.doctorForm=this.fb.group(
      {
        name:['',[Validators.required]],
        hospital:['',[Validators.required]],
      }
    );
    this.loadHospitals();
    this.doctorForm.get('hospital')?.valueChanges.subscribe(id=>
      {
        this.selectedHospital = this.hospitals.find(h=>h._id==id)
      }
    );
    // this.imgSubs= this.modalImageService.newImage.pipe(
    //   delay(1000)
    //   )
    //   .subscribe(()=>this.loadDoctor(this.selectedDoctor?.uid))
    

  }

  saveDoctor(){
    if(this.selectedDoctor){
      // console.log('Updating doctor');
      const data = {
        ...this.doctorForm.value,
        uid:this.selectedDoctor.uid
      }
     this.doctorService.updateDoctor(data)
     .subscribe(
      (resp)=>{
      Swal.fire('Success','Changes saved', 'success').then(()=>this.router.navigateByUrl('/dashboard/doctors')) 
      },
      (err)=>{
      Swal.fire('Error', 'Error saving doctor ' + err, 'error')
      }
      
      );
      
    }else{
      this.doctorService.createDoctor(this.doctorForm.value).subscribe(resp=>{
        Swal.fire('Success', `Doctor created`, 'success').finally(()=>this.router.navigateByUrl('/dashboard/doctors'))
        
      },
      (err)=>{
        Swal.fire('Error', `Error saving new Doctor`, 'error');
      }
  
      )
    }
    
  }
  loadHospitals(){
    this.hospitalService.getHospitals().subscribe(hospitals=>this.hospitals=hospitals);
  }
  // async openSweetAlert(){
  //   const value =  await Swal.fire<string>({
  //   title:"Create Doctor",
  //   text:"Enter the doctor name",
  //   input:'text',
  //   inputPlaceholder:"Doctor's name",
  //   showCancelButton:true,
  //   });
  //   // console.log(value);
  //   if(value.isConfirmed){
  //   const newName = value.value ||'';
  //   if(newName.length>0){
  //   this.createDoctor(newName);
  //   }
  //   }
    
  //   }
loadDoctor(id:string){
if(id==='new')return;  
  this.doctorService.getDoctor(id)
  .pipe(delay(100))
  .subscribe((doctor)=>
    {

      this.selectedDoctor = doctor;
      
      this.doctorForm.setValue({name:this.selectedDoctor.name, hospital:this.selectedDoctor.hospital?._id});
    
    },
    (error)=>this.router.navigateByUrl('/dashboard/doctors')
    );
}
openModal(doctor:Doctor){
  this.modalImageService.openModal('doctors',doctor.uid||'',doctor.img);
  }
}
