import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    
    <button *ngIf="isLogged" style="float: right;" (click)="logout()">Logout</button>
    <button *ngIf="!isOnLoginPage" style="float: right;" (click)="logout()">Logout</button>


    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {


  title = 'COGS';
   isLogged: boolean;


  constructor(private localStorage: CoolLocalStorage,
              private router: Router,
              private route:ActivatedRoute) {
   console.log(this.router.url + '     aa');

  }
  logout(): void {
    console.log(this.router.url + '     aa');
    this.localStorage.clear();
    this.router.navigate(['/login']);
  }

  isOnLoginPage(): boolean{
   return this.router.url === '/login' ? true:false;
  }


  ngOnInit(): void {
    this.isLogged = false;
  }



}
