import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Employments} from './employments.dto';
import {Token}  from '../../token'


import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from "angular2-cool-storage";


@Injectable()
export class EmploymentsService {
  localStorage: CoolLocalStorage;


  constructor(private http: Http,
              private token: Token,
              localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }


  private url = this.token.baseUrl + 'employments';
  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-access-token': 'NotSet'
  });


  create(data: any): Promise<any> {
    this.headers.set('x-access-token', this.localStorage.getItem('token'));

    return this.http
      .post(this.url, data, {headers: this.headers})
      .toPromise()
      .then(res => {
        console.log(res);
        console.log(res.json());

        if (res.json().created === true) {
          delete res.json().created;
          return res.json();
        }
        else {
          let obj = {
            'message': 'Cannot Add due to some error'
          }
          return obj;
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getEmployments(id: number): Promise<Employments[]> {
    let localUrl = this.url + '?EmployeeId=' + id;
    this.headers.set('x-access-token', this.localStorage.getItem('token'));

    return this.http
      .get(localUrl, {headers: this.headers})
      .toPromise()
      .then(res => {
        return res.json() as Employments[]
      })
      .catch(this.handleError);
  }

  update(data: Employments) {

    console.log("In service update... id:" + data.id);
    let localUrl = this.url + '/' + data.id;
    delete data.id;
    this.headers.set('x-access-token', this.localStorage.getItem('token'));

    return this.http
      .put(localUrl, data, {headers: this.headers})
      .toPromise()
      .then(res => {
        return res.json() as Employments
      })
      .catch(this.handleError);


  }

  delete(id: number) {
    let localUrl = this.url + '/' + id;
    this.headers.set('x-access-token', this.localStorage.getItem('token'));
    return this.http
      .delete(localUrl, {headers: this.headers})
      .toPromise()
      .then(res => {
        return res.json()
      })
      .catch(this.handleError);


  }

}
