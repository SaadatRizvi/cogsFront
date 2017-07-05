import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';


@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <nav >
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  localStorage: CoolLocalStorage;

  title = 'COGS';
   isLogged: boolean;

  constructor(localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }



  ngOnInit(): void {
    this.isLogged = false;
  }



}
