import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor.model';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs';

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
  
  createDoctor(name:string){
    const url = `${base_url}/${api}`;
    return this.http.post(url,{name},this.headers);
    
    
  }
  updateDoctor(_id:string, name:string){
    const url = `${base_url}/${api}/${_id}`;
    return this.http.put(url,{name},this.headers);
    
    
  }
  deleteDoctor(_id:string){
    const url = `${base_url}/${api}/${_id}`;
    return this.http.delete(url,this.headers);
    
    
  }
  
  
  
  
  
}
