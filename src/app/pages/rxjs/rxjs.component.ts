import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, take, map, filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit,OnDestroy {

  intervalSubs: Subscription = new Subscription;
  constructor() {

    // const observable$ = new Observable(
    //   observer => {
    //     let i = -1;
    // const interval = setInterval(()=>{
    //       console.log("Tick");
    //       i++;
    //       observer.next(i);
    //       if(i==10){
    //   clearInterval(interval);
    //   observer.complete();
    //       }
    //     }, 1000);
    //   }
    // );

    // observable$.subscribe(
    //   (value)=>{console.log("Subs: ", value);
    //   }
    // );
    this.intervalSubs = this.returnInterval().subscribe(val=>console.log(val));
    
   }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  returnInterval(){
    const interval$ = interval(500)
    .pipe(
      // take(10),
      map(val=>val+1 ),
      filter(val => (val%2)?true:false)
      
    )
    ;
    return interval$;
  }
}
