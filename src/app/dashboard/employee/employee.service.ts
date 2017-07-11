import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Employee} from './employee.dto';
import {Token}  from '../../token'



import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage';


@Injectable()
export class EmployeeService {
  localStorage: CoolLocalStorage;


  constructor(private http: Http,
              private token: Token,
              localStorage: CoolLocalStorage
  ) {     this.localStorage = localStorage;
  }
  private url=this.token.baseUrl + 'employees';
  private headers = new Headers({'Content-Type': 'application/json'});


  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getEmployee(id: number): Promise<Employee>{

  let localUrl = this.url +'/' + id;

    this.headers.set('x-access-token',this.localStorage.getItem('token'));
   // console.log(this.url);
   // console.log();
    return this.http
      .get(localUrl, {headers: this.headers})
      .toPromise()
      .then(res => {
        // console.log(res.json());
        return res.json() as Employee})
      .catch(this.handleError);
  }

  update(data: any): Promise<any> {
    let localUrl = this.url + '/' + data.id;
    delete data.id;
    this.headers.set('x-access-token', this.localStorage.getItem('token'));

    return this.http
      .put(localUrl, data, {headers: this.headers})
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(this.handleError);


  }
}
