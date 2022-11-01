import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './admin/users/users.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { HospitalsComponent } from './admin/hospitals/hospitals.component';
import { DoctorComponent } from './admin/doctors/doctor/doctor.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
 
      { path: '', component: DashboardComponent, data:{title:'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data:{title:'ProgressBar'}},
      { path: 'graphic1', component: Graphic1Component, data:{title:'Graphic'}},
      { path: 'account-settings', component: AccountSettingsComponent, data:{title:'Account Settings'}},
      { path: 'promises', component: PromisesComponent, data:{title:'Promises'}},
      { path: 'rxjs', component: RxjsComponent, data:{title:'Rxjs'}},
      { path: 'profile', component:ProfileComponent, data:{title:'User profile'}},

      { path: 'users', component:UsersComponent, data:{title:'Users'}},
      { path: 'doctors', component:DoctorsComponent, data:{title:'Doctors'}},
      { path: 'doctors/:id', component:DoctorComponent, data:{title:'Doctor'}},
      { path: 'hospitals', component:HospitalsComponent, data:{title:'Hospitals'}},
      // { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class PagesRoutingModule { }
