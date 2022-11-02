import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router:Router){

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
