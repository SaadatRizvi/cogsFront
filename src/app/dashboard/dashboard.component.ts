import { Component, OnInit } from '@angular/core';
import {CoolLocalStorage} from "angular2-cool-storage";
import {NavigationClass} from './navigation.class';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  EmployeeId: string;
  navLinks: string[];
  childComponents = ["education","employments","projects","addresses","contactDetails"];

  navObj: NavigationClass[];

  constructor( private localStorage: CoolLocalStorage) {
    this.EmployeeId= this.localStorage.getItem('id');

    this.navObj=new Array<NavigationClass>();


    this.navLinks=[];
    this.navObj=[];
    for(let component of this.childComponents){

      this.navObj.push({
        name: component,
        link: "/dashboard/"+this.EmployeeId+"/"+component
      });

     // this.navLinks.push("/dashboard/"+this.EmployeeId+"/"+component);
    }


  }

  ngOnInit(): void {

  }
}



