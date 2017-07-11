import {Component, OnInit} from '@angular/core';
import {CoolLocalStorage} from 'angular2-cool-storage';
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-root',
  template: `
    
    <section class="mat-typography">

      
        <h2>{{title}}</h2>

      
          <button md-raised-button *ngIf="isLoggedIn()" style="float: right;" (click)="logout()">Logout</button>
          <button md-raised-button *ngIf="showLoginButton()" (click)="login()">Login</button>
          <br><br><br>
      
      <router-outlet></router-outlet>
    </section>
  `,
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {


  title = 'COGS';
  // isLogged: boolean;


  constructor(private localStorage: CoolLocalStorage,
              private router: Router,
              private route: ActivatedRoute) {


  }

  logout(): void {

    this.localStorage.clear();
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);

  }

  isLoggedIn(): boolean {

    return !isNullOrUndefined(this.localStorage.getItem('token'));
  }

  showLoginButton(): boolean {

    let returnVal = (this.router.url !== '/login'
    && isNullOrUndefined(this.localStorage.getItem('token')));

    return returnVal;
  }


  ngOnInit(): void {

    if (this.isLoggedIn()) {
      this.login();
    }

  }


}
