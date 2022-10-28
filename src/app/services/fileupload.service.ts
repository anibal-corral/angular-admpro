import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const BASE_URL = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor() { }

async updateProfilePicture(
  file:File,
  type:'users'|'doctors'|'hospitals',
  id:string
){
  try {
    const url = `${BASE_URL}/uploads/${type}/${id}`;
    const formData = new FormData();
    formData.append('imagen', file);

    const resp:any = await fetch(url,{
      method:'PUT',
      headers:{
        'x-token': localStorage.getItem('token') || ''
      },
      body:formData
    });
   const data = await resp.json();
   if(data.ok){
    return data.fileName;
   }else{
    return false;
   }
    

  } catch (error) {
    console.log(error);
    return false;
    
  }
}

}
