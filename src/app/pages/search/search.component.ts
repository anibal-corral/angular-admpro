import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchsService } from '../../services/searchs.service';
import { User } from '../../models/user.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  users:User[]=[];
  doctors:Doctor[]=[];
  hospitals:Hospital[]=[];


  constructor(private activatedRoute:ActivatedRoute, private searchService:SearchsService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({term})=>this.globalSearch(term));
  }
  
globalSearch(term:string){
  this.searchService.gobalSearch(term).subscribe((resp:any)=>
    {
      // console.log(resp);
      this.users=resp.users;
      this.doctors=resp.doctors;
      this.hospitals=resp.hospitals;
    }
    
    
    );

}

openDoctor(doctor:Doctor){
this.router.navigateByUrl(`/dashboard/doctors/${doctor.uid}`)
}
openHospital(hospital:Hospital){
  
}
openUser(user:User){
  
}
}
