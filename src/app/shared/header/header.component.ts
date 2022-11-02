import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public user!:User;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    // this.imgUrl = this.userService.user.imgUrl;
    this.user = this.userService.user;
  }
  logout(){
    this.userService.logout();
    // this.router.navigateByUrl('/login');
  }

  search(term:string){
    console.log(term);
    if(term.length>0){
      this.router.navigateByUrl(`/dashboard/search/${term}`);
    }else{
      this.router.navigateByUrl(`/dashboard/`);
    }
    
  }

}
