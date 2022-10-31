import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const BASE_URL = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img:string, type:'users'|'doctors'|'hospitals'): string {
    if(img.includes('https:')){
      return img;
  }
  if(img){
      return `${BASE_URL}/uploads/${type}/${img}`;
  }else{
      return `${BASE_URL}/uploads/${type}/no-image`;
  }
   
  }

}
