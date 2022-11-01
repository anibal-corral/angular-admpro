import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay, Subscription } from 'rxjs';
import { SearchsService } from '../../../services/searchs.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {
hospitals:Hospital[]=[]
hospitalsTMP:Hospital[]=[]
loading:boolean=true;
imgSubs: Subscription = new Subscription;
  constructor(private hospitalService:HospitalService, 
              private modalImageService: ModalImageService,
              private hospitalSearchService:SearchsService
              ) { }

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs= this.modalImageService.newImage.pipe(
      delay(1000)
    )
    .subscribe(()=>this.loadHospitals())
      
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
   }
  loadHospitals(){
    this.loading=true;
    this.hospitalService.getHospitals().subscribe(hospitals => {
      
      this.hospitals=hospitals; this.loading=false
    });
  }
  
updateHospital(hospital:Hospital){
  console.log('Updating');
  this.hospitalService.updateHospitals(hospital._id, hospital.name).subscribe(
    (resp)=>{
      Swal.fire('Success','Changes saved', 'success')
    },
    (err)=>{
      Swal.fire('Error', 'Error saving hospital ' + err, 'error')
    }
  );
  
}
deleteHospital(hospital:Hospital){
  console.log('Deleting');
  this.hospitalService.deleteHospitals(hospital._id).subscribe(
    (resp)=>{
      this.loadHospitals();
      
      Swal.fire('Success','Hospital deleted', 'success')
    },
    (err)=>{
      Swal.fire('Error', 'Error deleting hospital ' + err, 'error')
    }
  )
  
}

createHospital(name:string){
  console.log('Creating Hospital');
  this.hospitalService.createHospitals(name).subscribe(
    (resp)=>{
      this.loadHospitals();
      Swal.fire('Success','Hospital created', 'success')
    },
    (err)=>{
      Swal.fire('Error', 'Error creating hospital ' + err, 'error')
    }
  )
  
}

async openSweetAlert(){
  const value =  await Swal.fire<string>({
    title:"Create Hospital",
    text:"Enter the hospital name",
    input:'text',
    inputPlaceholder:"Hospital's name",
    showCancelButton:true,
  });
  // console.log(value);
  if(value.isConfirmed){
    const newName = value.value ||'';
    if(newName.length>0){
      this.createHospital(newName);
    }
  }
  
}
openModal(hospital:Hospital){
  // console.log('Oppening modal');
  // console.log(hospital);
  
  this.modalImageService.openModal('hospitals',hospital._id||'',hospital.img);
}

search(term:string){
  if(term.length===0){
    return this.hospitals = this.hospitalsTMP;
  }else{
    return this.hospitalSearchService.search('hospitals',term).subscribe( result => 
      {
        this.hospitals = result as Hospital[]
      }
      );
  }
  
  
}

}
