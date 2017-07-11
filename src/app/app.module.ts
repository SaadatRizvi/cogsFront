import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {Token} from './token'
import { CoolStorageModule } from 'angular2-cool-storage';


import { AppRoutingModule } from './app-routing.module';


import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { AddressComponent } from './dashboard/address/address.component';
import { ContactDetailsComponent } from './dashboard/contact-details/contact-details.component';
import {EducationComponent} from './dashboard/education/education.component';
import { EmploymentsComponent } from './dashboard/employments/employments.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {CanActivateViaAuthGuard} from "app/Guards/can-activate-via-auth-guard";
import 'hammerjs';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//be sure to import the Angular Material modules
//after Angular's BrowserModule,
// as the import order matters for NgModules.
import { MdButtonModule, MdCardModule,
  MdMenuModule, MdToolbarModule, MdIconModule,
  MdSelectModule,MdInputModule,MdTabsModule,
  MdListModule} from '@angular/material';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CoolStorageModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdSelectModule,
    MdInputModule,
    MdTabsModule,
    MdListModule,


  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    AuthenticateComponent,
    ProjectsComponent,
    EmployeeComponent,
    AddressComponent,
    ContactDetailsComponent,
    EducationComponent,
    EmploymentsComponent,
    PageNotFoundComponent,

  ],
  providers: [ HeroService, Token, CanActivateViaAuthGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
