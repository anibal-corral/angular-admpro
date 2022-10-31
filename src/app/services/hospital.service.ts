import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
const base_url = environment.base_url;
const api = 'hospitals';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(private http:HttpClient, private router:Router) { }




get token():string{
  return localStorage.getItem('token')||'';
}
get headers(){
  return {
    headers:{
      'x-token':this.token
    }
  }
}

getHospitals(){
  const url = `${base_url}/${api}`;
  return this.http.get<{ok:boolean, hospitals:Hospital[]}>(url,this.headers)
  .pipe(
    map(
      (resp:
        { 
          ok:boolean, 
          hospitals:Hospital[]
        }) => resp.hospitals));
  
  
}





}
