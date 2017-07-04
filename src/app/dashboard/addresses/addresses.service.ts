import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Addresses} from './addresses.dto';
import {Token}  from '../../token'



import 'rxjs/add/operator/toPromise';


@Injectable()
export class AddressesService {
  private url=this.token.baseUrl + 'address';
  private headers = new Headers({'Content-Type': 'application/json',
    'x-access-token': this.token.getToken()});

  constructor(private http: Http,
              private token: Token) { }

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
   this.headers = new Headers({'Content-Type': 'application/json',
      'x-access-token': this.token.getToken()});
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
