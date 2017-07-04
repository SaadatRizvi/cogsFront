import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'COGS';
  isLogged: boolean;
 private static token: string;

  ngOnInit(): void {
    this.isLogged = false;
    AppComponent.token=null;
  }

 static  setToken(token: string){
    this.token=token;
  }
}