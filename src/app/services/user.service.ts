import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    );
    
  }
}
