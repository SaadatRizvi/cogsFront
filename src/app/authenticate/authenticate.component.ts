import { Component, OnInit, Input } from '@angular/core';
import { Router }            from '@angular/router';
import {LoginRequest} from './loginRequest.dto';
import { Observable }        from 'rxjs/Observable';
import {AuthenticateService} from './authenticate.service'
import {LoginRes} from './loginRes.dto';
import {Token} from '../token'


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

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService,
    ) { }


  ngOnInit(): void {
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
          Token.setToken(loginRes.token);
          this.failure = null;
          this.gotoDashboard();

        }
      });
  }

   gotoDashboard(): void {
     this.router.navigate(['/dashboard',this.loginRes.id]);
   }

  get() {
    this.authenticateService.authenticateGet();
  }

}