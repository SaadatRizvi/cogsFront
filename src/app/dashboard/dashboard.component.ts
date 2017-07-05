import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import {AppComponent} from '../app.component';
@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor() { }

  ngOnInit(): void {  }
}


//a
