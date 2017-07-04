import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Addresses} from './addresses.dto';
import {Token}  from '../../token'



import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from "angular2-cool-storage";


@Injectable()
export class AddressesService {
  localStorage: CoolLocalStorage;


  constructor(private http: Http,
              private token: Token,
              localStorage: CoolLocalStorage
  ) {     this.localStorage = localStorage;
  }
  private url=this.token.baseUrl + 'address';
  private headers = new Headers({'Content-Type': 'application/json',
    'x-access-token': 'aaaa'});

  //this.localStorage.getItem('token')

  // authenticateUser(data: Addresses): Promise<LoginRes> {
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

  getAddresses(id: number): Promise<Addresses> {
    this.url+='?EmployeeId='+id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));
    console.log(this.url);
    console.log(this.headers);
    return this.http
      .get(this.url, {headers: this.headers})
      .toPromise()
      .then(res => {
        console.log(res.json());
        return res.json() as Addresses})
      .catch(this.handleError);
  }
}
