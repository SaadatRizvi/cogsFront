import { Component, OnInit } from '@angular/core';

import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";


@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <nav *ngIf="isLogged">
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  providers: [LocalStorageService]
})
export class AppComponent implements OnInit {
  title = 'COGS';
  isLogged: boolean;

  ngOnInit(): void {
    this.isLogged = false;
  }

  constructor(storageService: LocalStorageService){}


  static  setToken(token: string){
  }
}
