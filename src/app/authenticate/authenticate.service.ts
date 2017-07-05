import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {LoginRequest} from './loginRequest.dto';
import {LoginRes} from './loginRes.dto';
import 'rxjs/add/operator/toPromise';
import {Token} from "../token";


@Injectable()
export class AuthenticateService  {

   private url=this.token.baseUrl + 'authenticate';
  private headers=new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,
              private token: Token) { }

  authenticateUser(data: LoginRequest): Promise<LoginRes> {
//console.log(data)
 //   console.log(this.url)

    return this.http
      .post(this.url, data, {headers: this.headers})
      .toPromise()
      .then(res => {
     //   console.log(res.json());
        return res.json() as LoginRes})
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  authenticateGet(): Promise<LoginRes> {
 //   console.log(this.url);
    return this.http
      .get(this.url)
      .toPromise()
      .then(res => {
  //      console.log(res.json());
        return res.json() as LoginRes})
      .catch(this.handleError);
  }
}

