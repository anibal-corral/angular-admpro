import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url;
const api = 'search';
@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(private http:HttpClient) { }

  search(type:'users'|'doctors'|'hospitals', term:string){
    const url = `${base_url}/${api}/collection/${type}/${term}`;
    console.log(url);
    
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
            
              return[];
            case 'hospitals':
            
              return[];
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

}
