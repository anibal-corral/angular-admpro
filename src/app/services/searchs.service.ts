import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;
const api = 'search';
@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(private http:HttpClient) { }

  gobalSearch(term:string){
    const url =`${base_url}/${api}/${term}`;
    const token = localStorage.getItem('token')||'';
    return this.http.get(url, {
      headers:{
        'x-token':token
      }
    })
  }

  search(type:'users'|'doctors'|'hospitals', term:string):Observable<User[] | Doctor[] | Hospital[]>{
    const url = `${base_url}/${api}/collection/${type}/${term}`;
    // console.log(url);
    
    const token = localStorage.getItem('token')||'';
    return this.http.get(url,{
      headers:{
        'x-token':token
      }
    }).pipe(
      map( (resp:any) => {
        switch (type) {
          case 'users':
            return this.createUsers(resp.result)
            case 'doctors':
              return this.createDoctors(resp.result)
            case 'hospitals':
              return this.createHospitals(resp.result)
          default:
            return[];
        }

      })
    )
  }

  private createUsers(results:any[]):User[]{

    return results.map(
      user => new User(user.name,user.email,user.google,'',user.img, user.role, user.uid)
    )

  }
  private createHospitals(results:any[]):Hospital[]{

    return results.map(
      hospital => new Hospital(hospital._id, hospital.name, hospital.ser,hospital.active, hospital.img)
    )

  }
  private createDoctors(results:any[]):Doctor[]{

    return results.map(
      doctor => new Doctor(doctor.name,doctor.id,doctor.img,doctor.user)
    )

  }

}
