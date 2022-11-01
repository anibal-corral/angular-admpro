import { environment } from "src/environments/environment";

const BASE_URL = environment.base_url;
interface _DoctorlUser{
    name:string;
    _id:string;
    img:string
}

export class Doctor {
    constructor (
        public name:string,
        public _id:string,
        public img:string ='',
        public user?:_DoctorlUser


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