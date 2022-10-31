import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {
hospitals:Hospital[]=[]
  constructor(private hospitalService:HospitalService) { }

  ngOnInit(): void {
  this.loadHospitals();    
  }

  loadHospitals(){
    this.hospitalService.getHospitals().subscribe(hospitals => this.hospitals=hospitals);

  }

}
