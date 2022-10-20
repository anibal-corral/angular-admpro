import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent implements OnInit {
  maxPercentage:number=100;
  minPercentage:number=0;
  @Input('value')progress:number = 10;
  @Output() valueChanged:EventEmitter<number>=new EventEmitter();
  
  @Input() btnClass: string = 'btn btn-primary';

  changeValue(val:number){
    if(this.progress>=this.maxPercentage && val >=0){ 
      this.valueChanged.emit(this.maxPercentage);
      return this.progress=this.maxPercentage;
    }
    if(this.progress<=this.minPercentage && val <0) {
      this.valueChanged.emit(this.minPercentage);
      return this.progress=this.minPercentage;
    }
    this.progress=this.progress+val;
    this.valueChanged.emit(this.progress);
    return this.progress;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
