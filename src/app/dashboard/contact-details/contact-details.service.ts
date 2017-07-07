import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {ContactDetails} from './contact-details.dto';
import {Token}  from '../../token'



import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from "angular2-cool-storage";


@Injectable()
export class ContactDetailsService {
  localStorage: CoolLocalStorage;


  constructor(private http: Http,
              private token: Token,
              localStorage: CoolLocalStorage
  ) {     this.localStorage = localStorage;
  }
  private url=this.token.baseUrl + 'contactDetail';
  private headers = new Headers({'Content-Type': 'application/json',
    'x-access-token': 'NotSet'});

  //this.localStorage.getItem('token')

  // authenticateUser(data: ContactDetails): Promise<LoginRes> {
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

  getContactDetails(id: number): Promise<ContactDetails> {
    this.url+='?EmployeeId='+id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));
   // console.log(this.url);
   // console.log(this.headers);
    return this.http
      .get(this.url, {headers: this.headers})
      .toPromise()
      .then(res => {
    //    console.log(res.json());
        return res.json() as ContactDetails})
      .catch(this.handleError);
  }

  update(data: ContactDetails){

    let localUrl=this.url+'/'+data.id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));
    return this.http
      .put(localUrl, data,{headers: this.headers})
      .toPromise()
      .then(res => {
        //       console.log(res.json() as Addresses);
        return res.json()})
      .catch(this.handleError);


  }}
