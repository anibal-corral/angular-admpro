import { environment } from "src/environments/environment";

const BASE_URL = environment.base_url;
export class User {
    constructor (
        
        
        public name:string,
        public email:string,
        public google:boolean,
        public pwd?:string,
        public img?:string,
        public role?:string,
        public uid?:string,

    ){}

    get imgUrl(){
        if(this.img?.includes('https:')){
            return this.img;
        }
        if(this.img){
            return `${BASE_URL}/uploads/users/${this.img}`;
        }else{
            return `${BASE_URL}/uploads/users/no-image`;
        }
   
    }
}