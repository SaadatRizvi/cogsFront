import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    
    <button class="logButton logout" *ngIf="isLoggedIn()" style="float: right;" (click)="logout()">Logout</button>
    <button class="logButton login" *ngIf="showLoginButton()" style="float: right;" (click)="login()">Login</button>


    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {


  title = 'COGS';
  // isLogged: boolean;


  constructor(private localStorage: CoolLocalStorage,
              private router: Router,
              private route:ActivatedRoute) {


  }
  logout(): void {

    this.localStorage.clear();
    this.router.navigate(['/login']);
  }

  login(): void{
    this.router.navigate(['/login']);

  }

  isLoggedIn(): boolean{

    return !isNullOrUndefined(this.localStorage.getItem('token'));
  }

  showLoginButton(): boolean{

    let returnVal = (this.router.url !== '/login'
    && isNullOrUndefined(this.localStorage.getItem('token')));

   return  returnVal;}


  ngOnInit(): void {

    if( this.isLoggedIn()){
      this.login();
    }

  }



}
