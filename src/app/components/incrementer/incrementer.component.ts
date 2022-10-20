import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent implements OnInit {
  progress:number = 10;
  maxPercentage:number=100;
  minPercentage:number=0;

  get getPercentage(){
    return `${this.progress}%`
  }
  changeValue(val:number){
    if(this.progress>=this.maxPercentage && val >=0) return this.progress=this.maxPercentage;
    if(this.progress<=this.minPercentage && val <0) return this.progress=this.minPercentage;
      
    return this.progress=this.progress+val;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
