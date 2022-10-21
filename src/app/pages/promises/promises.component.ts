import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
//         const promise = new Promise(
//           (resolve, reject)  =>
//           {
//             if(false){
//               resolve('Hi World');
//             }else{
//               reject("Something went wrong")
//             }
          
//         }
//         );
// promise.then((message)=>{
//   console.log(message);
//   }).catch((error)=>{console.log('Error',error);
// })
// ;
//         console.log('End init');
  this.getUsers().then(users => console.log(users));
}
getUsers(){
  const promise = new Promise((resolve)=>{
    fetch('https://reqres.in/api/users')
    .then((resp)=>resp.json())
    .then((body)=>console.log(body.data))    
    .catch((error)=>{console.log('I dont have data', error);
    })
  });
  return promise;
  
}

}
