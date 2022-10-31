import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementerComponent } from './incrementer/incrementer.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DonutComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    IncrementerComponent,
    DonutComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
