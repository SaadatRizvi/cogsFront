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


  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getContactDetails(id: number): Promise<any> {
    let localUrl=this.url+'?EmployeeId='+id;

    this.headers.set('x-access-token',this.localStorage.getItem('token'));

    return this.http
      .get(localUrl, {headers: this.headers})
      .toPromise()
      .then(res => {
        if(res.json().length > 0)
          return res.json() as ContactDetails;
        else return false;
      })
      .catch(this.handleError);
  }

  update(data: ContactDetails){

    let localUrl=this.url+'/'+data.id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));
    return this.http
      .put(localUrl, data,{headers: this.headers})
      .toPromise()
      .then(res => {
        return res.json()})
      .catch(this.handleError);


  }
  create(data: any): Promise<any> {
    this.headers.set('x-access-token',this.localStorage.getItem('token'));

    return this.http
      .post(this.url, data, {headers: this.headers})
      .toPromise()
      .then(res => {
        if(res.json().created){
          let newData=res.json();
          delete newData.created;
          return newData
        }
        else{
          console.log(res)
          return Object.assign({message:'There was a problem'},res.json());

        } })
      .catch(this.handleError);
  }

}
