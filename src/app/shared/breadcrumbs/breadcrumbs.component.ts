import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
title:string=''
title$:Subscription = new Subscription();

  constructor(private router: Router) { 
    
   this.title$= this.getArgumentsFromRoute().subscribe(data => {
      this.title=data['title'];
  });

  }
  ngOnDestroy(): void {
    this.title$.unsubscribe();
  }

  ngOnInit(): void {
  }
  getArgumentsFromRoute(){
    return this.router.events
    .pipe(
      filter( (event):event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd)=>event.snapshot.firstChild === null  ),
      map((event:ActivationEnd) => event.snapshot.data)    
    )
    
  }

}
