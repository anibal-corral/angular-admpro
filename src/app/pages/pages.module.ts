import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { Graphic1Component } from './graphic1/graphic1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './admin/users/users.component';
import { HospitalsComponent } from './admin/hospitals/hospitals.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';





@NgModule({
  declarations: [
     DashboardComponent,
     ProgressComponent,
     Graphic1Component,
     PagesComponent,
     AccountSettingsComponent,
     PromisesComponent,
     RxjsComponent,
     ProfileComponent,
     UsersComponent,
     HospitalsComponent,
     DoctorsComponent,
     
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Graphic1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
    
  ]

})
export class PagesModule { }
