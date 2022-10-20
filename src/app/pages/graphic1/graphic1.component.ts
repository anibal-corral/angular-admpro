import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: [
  ]
})
export class Graphic1Component implements OnInit {
  
labels1:string[] = ['item1', 'item2', 'item3'];
data1 = this.getDataMock();
labels2:string[] = ['item4', 'itemAAA', 'item3'];
data2 = this.getDataMock();
labels3:string[] = ['item1', 'item2', 'item3'];
data3 = this.getDataMock();
labels4:string[] = ['item1', 'item2', 'item3'];
data4 = this.getDataMock();
  constructor() { }

  ngOnInit(): void {
  }

getRandomValue() {
  return Math.floor(Math.random()*(100-1+1)+1);
  
}

getDataMock(){
  return [
    
      this.getRandomValue(),
      this.getRandomValue(),
      this.getRandomValue()
    
  ]
}



}
