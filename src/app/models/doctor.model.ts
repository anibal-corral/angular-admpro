import { environment } from "src/environments/environment";
import { Hospital } from "./hospital.model";

const BASE_URL = environment.base_url;
interface _doctorlUser{
    name:string;
    _id:string;
    img:string
}

export class Doctor {
    constructor (
        public name:string,
        public uid:string,
        public img:string ='',
        public user?:_doctorlUser,
        public hospital?:Hospital


    ){}

    // get imgUrl(){
    //     if(this.img?.includes('https:')){
    //         return this.img;
    //     }
    //     if(this.img){
    //         return `${BASE_URL}/uploads/users/${this.img}`;
    //     }else{
    //         return `${BASE_URL}/uploads/users/no-image`;
    //     }
   
    // }
}