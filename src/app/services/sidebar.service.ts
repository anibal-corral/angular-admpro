import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu =[];
  // menu:any[]=[
  //   {
  //     title:'Dashboard',
  //     icon:'mdi mdi-gauge',
  //     submenu:[
  //       { title: 'Main', url:'/'},
  //       { title: 'ProgressBar', url:'progress'},
  //       { title: 'Graphics', url:'graphic1'},
  //       { title: 'Promises', url:'promises'},
  //       { title: 'Rxjs', url:'rxjs'},
  //     ]
  //   },
  //   {
  //     title:'Admin',
  //     icon:'mdi mdi-folder-lock-open',
  //     submenu:[
  //       { title: 'Users', url:'users'},
  //       { title: 'Doctors', url:'doctors'},
  //       { title: 'Hospitals', url:'hospitals'},
        
  //     ]
  //   }
  // ];

  loadMenu(){
this.menu=JSON.parse(localStorage.getItem('menu')||'')||[];
if(this.menu.length===0){
this.userService.logout();
}
  }
  constructor(private userService:UserService) { }
}
