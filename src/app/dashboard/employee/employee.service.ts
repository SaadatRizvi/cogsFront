import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Employee} from './employee.dto';
import {Token}  from '../../token'



import 'rxjs/add/operator/toPromise';


@Injectable()
export class EmployeeService {
  private url= Token.baseUrl + 'employee';
  private headers = new Headers({'Content-Type': 'application/json',
                                  'x-access-token': Token.getToken()});

  constructor(private http: Http) { }

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

  getEmployee(id: number): Promise<Employee> {
    this.url += '/' + id;
    console.log(this.url);
    console.log();
    return this.http
      .get(this.url, {headers: this.headers})
      .toPromise()
      .then(res => {
        console.log(res.json());
        return res.json() as Employee})
      .catch(this.handleError);
  }
}
