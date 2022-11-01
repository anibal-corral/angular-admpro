import { environment } from "src/environments/environment";

const BASE_URL = environment.base_url;
interface _hospitalUser{
    name:string;
    _id:string;
    img:string
}

export class Hospital {
    constructor (
        public _id:string,
        public name:string,
        public user?:_hospitalUser,
        public active:boolean = true,
        public img:string ='',
        


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