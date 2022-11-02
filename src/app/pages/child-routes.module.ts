import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic1Component } from './graphic1/graphic1.component';

import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './admin/users/users.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { HospitalsComponent } from './admin/hospitals/hospitals.component';
import { DoctorComponent } from './admin/doctors/doctor/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes:Routes = [
  { path: '', component: DashboardComponent, data:{title:'Dashboard'}},
  { path: 'progress', component: ProgressComponent, data:{title:'ProgressBar'}},
  { path: 'graphic1', component: Graphic1Component, data:{title:'Graphic'}},
  { path: 'account-settings', component: AccountSettingsComponent, data:{title:'Account Settings'}},
  { path: 'promises', component: PromisesComponent, data:{title:'Promises'}},
  { path: 'rxjs', component: RxjsComponent, data:{title:'Rxjs'}},
  { path: 'profile', component:ProfileComponent, data:{title:'User profile'}},
  
  //ADMIN SECTION
  { path: 'users', component:UsersComponent,canActivate:[AdminGuard], data:{title:'Users'}},
  { path: 'doctors', component:DoctorsComponent, data:{title:'Doctors'}},
  { path: 'doctors/:id', component:DoctorComponent, data:{title:'Doctor'}},
  { path: 'hospitals', component:HospitalsComponent, data:{title:'Hospitals'}},
  { path: 'search/:term', component:SearchComponent, data:{title:'Searching..'}}
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
]

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class ChildRoutesModule { }
