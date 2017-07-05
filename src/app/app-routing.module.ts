import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import {ProjectsComponent} from './dashboard/projects/projects.component'
import {AddressesComponent} from './dashboard/addresses/addresses.component'
import {ContactDetailsComponent} from './dashboard/contact-details/contact-details.component'
import {EmployeeComponent} from './dashboard/employee/employee.component';
import {EducationComponent} from './dashboard/education/education.component';
import {EmploymentsComponent} from "./dashboard/employments/employments.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'projects/:id',  component: ProjectsComponent },
  { path: 'addresses/:id',  component: AddressesComponent },
  { path: 'contactDetails/:id',  component: ContactDetailsComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'dashboard/:id',  component: DashboardComponent },
  { path: 'education/:id',  component: EducationComponent},
  { path: 'employments/:id',  component: EmploymentsComponent},
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'login',     component: AuthenticateComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
