import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor.model';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs';
import { Console } from 'console';

const base_url = environment.base_url;
const api = 'doctors';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
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
  
  getDoctors(){
    const url = `${base_url}/${api}`;
    return this.http.get<{ok:boolean, doctors:Doctor[]}>(url,this.headers)
    .pipe(
      map(
        (resp:
          { 
            ok:boolean, 
            doctors:Doctor[]
          }) => resp.doctors));
    
    
  }
  
  createDoctor(doctor:{name:string, hospital:string}){
    console.log('Creating doctor')
    const url = `${base_url}/${api}`;
    // console.log('Createing doctor ', {doctor});
    return this.http.post(url,doctor,this.headers);
    
    
  }
  updateDoctor(doctor:Doctor){
    // console.log('Updating doctor ')
    const url = `${base_url}/${api}/${doctor.uid}`;
    
   
    return this.http.put(url,
      doctor
      ,this.headers);
    
    
  }
  deleteDoctor(_id:string){
    const url = `${base_url}/${api}/${_id}`;
    return this.http.delete(url,this.headers);
    
    
  }

  getDoctor(id:string){
    const url = `${base_url}/${api}/${id}`;
    return this.http.get(url,this.headers).pipe(
      map(
        (resp:any)=>{
          const doctor:Doctor = new Doctor(resp.doctor.name,resp.doctor.uid,resp.doctor.img,resp.doctor.user,resp.doctor.hospital)
         return doctor
        }
      )
    );

  }
  
  
  
  
  
}
