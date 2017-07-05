import { Component, OnInit } from '@angular/core';
import {CoolLocalStorage} from "angular2-cool-storage";
@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  EmployeeId: string;

  constructor( private localStorage: CoolLocalStorage) {
    this.EmployeeId= this.localStorage.getItem('id');
  }

  ngOnInit(): void {

  }
}



