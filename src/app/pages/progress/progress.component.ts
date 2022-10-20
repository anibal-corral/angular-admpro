import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent implements OnInit {

  progress1:number = 20;
  progress2:number = 50;
  get getProgress1(){
    return `${this.progress1}%`;
  }
  get getProgress2(){
    return `${this.progress2}%`;
  }

  

  constructor() { }

  ngOnInit(): void {
  }

}
