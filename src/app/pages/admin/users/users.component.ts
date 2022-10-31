import { IfStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';
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
usersTMP:User[] = [];
from:number = 0;
loading:boolean=true;


  constructor(private userService:UserService, private userSearchService:SearchsService) { }

  ngOnInit(): void {
    this.loadUsers();
    }
    loadUsers(){
      this.loading=true;

      this.userService.getUsers(this.from).subscribe(
        ({total,users})=>
        {
          this.totalUsers = total;
        
          this.users = users;
          this.usersTMP=users;
          this.loading=false;
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

    search(term:string){
      if(term.length===0){
        return this.users = this.usersTMP;
      }else{
        return this.userSearchService.search('users',term).subscribe( result => 
          {
            this.users = result 
          }
          );
      }
      
      
    }

 

}
