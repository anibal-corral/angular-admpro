import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
const base_url = environment.base_url;
const api = 'users';
@Injectable({
  providedIn: 'root'
})

export class UserService {


  constructor(private http:HttpClient) { }

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
}
