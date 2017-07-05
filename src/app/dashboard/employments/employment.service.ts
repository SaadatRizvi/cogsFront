import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Employments} from './employment.dto';
import {Token}  from '../../token'



import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage';


@Injectable()
export class EmploymentService {
  localStorage: CoolLocalStorage;


  constructor(private http: Http,
              private token: Token,
              localStorage: CoolLocalStorage
  ) {     this.localStorage = localStorage;
  }
  private url=this.token.baseUrl + 'employments';
  private headers = new Headers({'Content-Type': 'application/json'});

  // authenticateUser(data: Projects): Promise<LoginRes> {
  //   console.log(data)
  //   return this.http
  //     .post(this.url, data, {headers: this.headers})
  //     .toPromise()
  //     .then(res => {
  //       console.log(res.json());
  //       return res.json() as LoginRes})
  //     .catch(this.handleError);
  // }
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getEmployment(id: number): Promise<Employments> {
    this.url += '/' + id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));
    console.log(this.url);
    console.log();
    return this.http
      .get(this.url, {headers: this.headers})
      .toPromise()
      .then(res => {
        console.log(res.json());
        return res.json() as Employments})
      .catch(this.handleError);
  }
}
