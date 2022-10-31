import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
declare const google:any;
const base_url = environment.base_url;
const api = 'users';
@Injectable({
  providedIn: 'root'
})



export class UserService {
  user!:User;

  constructor(private http:HttpClient, private router:Router) { }
  validateToken():Observable<boolean>{
    const token = localStorage.getItem('token')||'';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      // tap(
        map(
        (resp:any)=>{
          localStorage.setItem('token', resp.token);
          // this.user = resp.user;
          const { email, google, name, role, uid, img} = resp.user;
          this.user = new User(name,email,google,'',img,role,uid);
          return true;
        }),
        // map(resp => true),
        catchError(error=>of(false))
    ) ;
  }
  createUser(formData:RegisterForm){
    return this.http.post(
      `${base_url}/${api}/`,
      formData
    ).pipe(
      tap((resp:any) => {
        console.log(resp);
        localStorage.setItem('token', resp.token)
      })
    )
    
  }
  loginUser(formData:LoginForm){
    return this.http.post(
      `${base_url}/login`,
      formData
    ).pipe(
      tap((resp:any) => {
         localStorage.setItem('token', resp.token)
      })
    )
  }
  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('anibal.corral@gmail.com',()=>{
      this.router.navigateByUrl('/login');
    })
  }

  updateProfile(data:{email:string, name:string}){
    const token = localStorage.getItem('token')||'';

    const m = {
      ...data,
      role:this.user.role,
      

    }
    return this.http.put(
      `${base_url}/${api}/${this.user.uid}`, data
      ,{
        headers:{
          'x-token':token
        }
      }
      )
  }

  getUsers(from: number = 0){
    const url = `${base_url}/${api}?from=${from}`;
    const token = localStorage.getItem('token')||'';
    return this.http.get<{total:number, users:User[]}>(url,{
      headers:{
        'x-token':token
      }
    }).pipe(
      delay(500),
      map(resp => {
        const users = resp.users.map(user => new User(user.name,user.email,user.google,'',user.img, user.role, user.uid))
        return {
          total:resp.total,
          users
        };
      })
    )
  }
}
