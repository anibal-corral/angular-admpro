import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
menuItems:any[]=[];
user!:User;
  constructor(private sidebarService:SidebarService, private userService:UserService) {
    this.menuItems=sidebarService.menu;
   }

  ngOnInit(): void {
    // this.imgUrl = this.userService.user.imgUrl;
    // this.userName = this.userService.user.name;
    this.user = this.userService.user;
  }

}
