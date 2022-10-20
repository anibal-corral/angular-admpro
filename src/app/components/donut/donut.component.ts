import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit,OnChanges {

  @Input() title:string="Default";
  @Input('chartLabels') doughnutChartLabels: string[] = [ 'Downloadsss Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input('chartData') data:number[] = [ 100, 200, 300 ]
  
  constructor() { }

  ngOnInit(): void {
  }
ngOnChanges():void{
  this.doughnutChartData= {
    labels: this.doughnutChartLabels,
    datasets: [
      { data:  this.data},
    ]
  };
}
  
  
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data:  this.data},
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
