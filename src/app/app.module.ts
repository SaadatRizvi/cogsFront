import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {Token} from './token'


import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { AddressesComponent } from './dashboard/addresses/addresses.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    AuthenticateComponent,
    ProjectsComponent,
    EmployeeComponent,
    AddressesComponent,
  ],
  providers: [ HeroService, Token],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
