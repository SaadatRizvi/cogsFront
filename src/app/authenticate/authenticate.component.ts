import { Component, OnInit, Input } from '@angular/core';
import { Router }            from '@angular/router';
import {LoginRequest} from './loginRequest.dto';
import { Observable }        from 'rxjs/Observable';
import {AuthenticateService} from './authenticate.service'
import {LoginRes} from './loginRes.dto';



@Component({
  selector: 'authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: [ './authenticate.component.css' ],
providers: [AuthenticateService]
})

export class AuthenticateComponent implements OnInit{

  loginData: LoginRequest;
  loginRes: LoginRes;
  constructor(private authenticateService: AuthenticateService){}

  ngOnInit(): void {
    this.loginData = new LoginRequest();
    this.loginData.email = '';
    this.loginData.password = '';
    this.loginRes = new LoginRes();
    this.loginRes.token = '';
    this.loginRes.message = '';
    this.loginRes.success = false;

  }

  submit() {
    this.authenticateService.authenticateUser(this.loginData);
  }
  get() {
    this.authenticateService.authenticateGet();
  }

}
