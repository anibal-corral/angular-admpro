import { IfStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
totalUsers:number=0;
users:User[] = [];
usersTMP:User[] = [];
from:number = 0;
loading:boolean=true;

  imgSubs: Subscription = new Subscription;



  constructor(private userService:UserService, 
    private userSearchService:SearchsService,
    private modalImageService:ModalImageService
    ) { }
  ngOnDestroy(): void {
   this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();

   this.imgSubs= this.modalImageService.newImage.pipe(
      delay(1000)
    )
    .subscribe(()=>this.loadUsers())

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
            this.users = result as User[]; 
          }
          );
      }
      
      
    }


    deleteUser(user:User){
      if(user.uid === this.userService.user.uid){
        Swal.fire('Error', 'You cannot delete yourself', 'error');
        return;
      }
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        // confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user).subscribe(
            (resp) => {
              Swal.fire(
              'User deleted',
              `${user.name} has been deleted`,
              'success'
            );
          this.loadUsers();
        },
            (error) => Swal.fire(
              'Error',
              `Error ${error}`,
              'error'
            ), 
          )
          
        }
      })
    }
    changeRole(user:User){
      console.log(user);
      // const {email, name, role='USER_ROLE'} = user;
      this.userService.updateUser(user).subscribe(
        
        resp => console.log(resp)
        
        );
    }
    openModal(user:User){
      
      this.modalImageService.openModal('users',user.uid||'',user.img);
    }
 

}
