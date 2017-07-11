import { Component, OnInit, Input } from '@angular/core';
import { Router }            from '@angular/router';
import {LoginRequest} from './loginRequest.dto';
import { Observable }        from 'rxjs/Observable';
import {AuthenticateService} from './authenticate.service'
import {LoginRes} from './loginRes.dto';
import {Token} from '../token';
import { CoolLocalStorage } from 'angular2-cool-storage';
import {AppComponent} from "../app.component";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: [ './authenticate.component.css' ],
providers: [AuthenticateService]
})

export class AuthenticateComponent implements OnInit{

  loginData: LoginRequest;
  loginRes: LoginRes;
  failure: string;
  localStorage: CoolLocalStorage;

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService,
    private token: Token,
    localStorage: CoolLocalStorage
    ) {     this.localStorage = localStorage;
    this.loginData = new LoginRequest();
    this.loginData.email = null;
    this.loginData.password = null;
  }


    isLoggedIn(): boolean{
      return !isNullOrUndefined(this.localStorage.getItem('token'));
    }



  ngOnInit(): void {

     if( this.isLoggedIn() ){
       this.gotoDashboard();
     }


    this.loginData = new LoginRequest();
    this.loginData.email = null;
    this.loginData.password = null;



    this.loginRes = new LoginRes();
    this.loginRes.token = null;
    this.loginRes.message = null;
    this.loginRes.success = false;
    this.loginRes.id=null;

    this.failure=null;

  }



  submit() {
    this.authenticateService.authenticateUser(this.loginData)
      .then(loginRes=>{
        if(!loginRes.success){
          this.failure=loginRes.message;
        }
        else {

          this.loginRes=loginRes;
         // this.token.setToken(loginRes.token);
          this.localStorage.setItem('token', loginRes.token);
          this.localStorage.setItem('id', ''+loginRes.id);

     //     console.log('Authenticate Component.ts -->'+this.localStorage.getItem('token'));
          this.failure = null;
          this.gotoDashboard();

        }
      });
  }

   gotoDashboard(): boolean {
     this.router.navigate(['/dashboard',this.localStorage.getItem('id')]);
     return true;
   }



}
