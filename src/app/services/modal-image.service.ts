import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
private _hideModal:boolean=true;
  id:string ='';
  type:'users'|'doctors'|'hospitals'='users';
  img:string='';

  newImage:EventEmitter<string>=new EventEmitter<string>()

  constructor() { }



  get hideModal(){
    
    return this._hideModal;
  }

  openModal(type:'users'|'doctors'|'hospitals', id:string, img:string ='no-img'){
// console.log('Open Modal Image Service with ');
// console.log({type, id, img});
    this._hideModal=false;
    this.type=type;
    this.id=id;
    if(img.includes('https')){
      this.img=img;
    }else{
      // http://localhost:3000/api/uploads/users/929a8d05-04d2-4e94-8468-b103f244ee41.jpg
      this.img=`${BASE_URL}/uploads/${type}/${img}`;
    }


    
  }
  closeModal(){
    this._hideModal=true;
    this.id='';
    this.img=''
  }
}
