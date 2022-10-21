import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {
title:string=''
  constructor(private router: Router) { 
    this.router.events
    .pipe(
      filter( (event):event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd)=>event.snapshot.firstChild === null  ),
      map((event:ActivationEnd) => event.snapshot.data)    
    )
    .subscribe(data => {
this.title=data['title'];

    });

  }

  ngOnInit(): void {
  }

}
