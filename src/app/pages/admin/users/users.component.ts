import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
totalUsers:number=0;
users:User[] = [];
from:number = 0;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.loadUsers();
    }
    loadUsers(){
      this.userService.getUsers(this.from).subscribe(
        ({total,users})=>
        {
          this.totalUsers = total;
        
          this.users = users;
        }
        )
    }

    changePage(value:number){
      this.from += value;
      //From never could be less than 0
      if(this.from<0){
      this.from =0;
      }else if(this.from >this.totalUsers){
        this.from -= value;
      }

      this.loadUsers();

    }

}
