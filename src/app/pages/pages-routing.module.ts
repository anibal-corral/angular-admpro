import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dashboard', 
    component: PagesComponent,
    children: [
 
      { path: '', component: DashboardComponent, data:{title:'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data:{title:'ProgressBar'}},
      { path: 'graphic1', component: Graphic1Component, data:{title:'Graphic'}},
      { path: 'account-settings', component: AccountSettingsComponent, data:{title:'Account Settings'}},
      { path: 'promises', component: PromisesComponent, data:{title:'Promises'}},
      { path: 'rxjs', component: RxjsComponent, data:{title:'Rxjs'}}
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
