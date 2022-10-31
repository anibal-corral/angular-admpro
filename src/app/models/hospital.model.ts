import { environment } from "src/environments/environment";

const BASE_URL = environment.base_url;
interface _hospitalUser{
    name:string;
    _id:string;
    img:string
}

export class Hospital {
    constructor (
        public name:string,
        public _id:string,
        public img:string ='',
        public user?:_hospitalUser


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