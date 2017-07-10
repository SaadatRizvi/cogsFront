import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import {ProjectsComponent} from './dashboard/projects/projects.component'
import {AddressComponent} from './dashboard/address/address.component'
import {ContactDetailsComponent} from './dashboard/contact-details/contact-details.component'
import {EmployeeComponent} from './dashboard/employee/employee.component';
import {EducationComponent} from './dashboard/education/education.component';
import {EmploymentsComponent} from "./dashboard/employments/employments.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CanActivateViaAuthGuard} from "./Guards/can-activate-via-auth-guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard/:id',  component: DashboardComponent,
    canActivate: [
      CanActivateViaAuthGuard
    ],
    children: [
      { path: 'addresses', component: AddressComponent },
      { path: 'contactDetails', component: ContactDetailsComponent},
      { path: 'employments', component: EmploymentsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'education', component: EducationComponent },
      { path: 'projects', component: ProjectsComponent },

    ]},


  { path: 'login', component: AuthenticateComponent },
  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
