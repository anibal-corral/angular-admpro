import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import {  Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router:Router){

  }
  canLoad(route: Route, segments: UrlSegment[])
   
  {
    return this.userService.validateToken().pipe(
      tap((authenticated:boolean)=>{
        if(!authenticated){
          this.cleanLocalStorage();
          this.router.navigateByUrl('/login')
          
        }
        
      })
     );


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      
     return this.userService.validateToken().pipe(
      tap((authenticated:boolean)=>{
        if(!authenticated){
          this.cleanLocalStorage();
          this.router.navigateByUrl('/login')
          
        }
        
      })
     );
  }

  cleanLocalStorage(){
    localStorage.removeItem('menu');
    localStorage.removeItem('token');
  }
  
}
