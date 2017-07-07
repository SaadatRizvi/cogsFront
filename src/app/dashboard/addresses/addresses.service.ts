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


  public formErrors = {
    'street': '',
    'city': '',
    'country': '',
    'type': ''
  };

  public validationMessages = {
    'street': {
      'required': 'Required.',
      'alpha': 'Must contain alphabets only'
    },
    'city': {
      'required': 'Required.',
      'alpha': 'Must contain alphabets only'
    },
    'country': {
      'required': 'Required.',
      'alpha': 'Must contain alphabets only'
    },
    'type': {
      'required': 'Required.',
      'alpha': 'Must contain alphabets only'
    }
  };


  private url=this.token.baseUrl + 'address';
  private headers = new Headers({'Content-Type': 'application/json',
    'x-access-token': 'NotSet'});

  //this.localStorage.getItem('token')

  create(data: any): Promise<any> {
    //console.log(data)
    this.headers.set('x-access-token',this.localStorage.getItem('token'));

    return this.http
      .post(this.url, data, {headers: this.headers})
      .toPromise()
      .then(res => {
       // console.log(res.json());
        return res.json() })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getAddresses(id: number): Promise<Addresses[]> {
    let localUrl=this.url+'?EmployeeId='+id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));
   // console.log(this.url);
   // console.log(this.headers);
    return this.http
      .get(localUrl, {headers: this.headers})
      .toPromise()
      .then(res => {
        //console.log(res.json());
        return res.json() as Addresses[]})
      .catch(this.handleError);
  }

//response.json().data as Hero[]
  update(data: Addresses){

   console.log("In service update... id:"+data.id);
    let localUrl=this.url+'/'+data.id;
    delete data.id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));

    return this.http
      .put(localUrl, data,{headers: this.headers})
      .toPromise()
      .then(res => {
    //       console.log(res.json() as Addresses);
        return res.json() as Addresses})
      .catch(this.handleError);


  }

  delete(id:number){
    let localUrl=this.url+'/'+id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));
    return this.http
      .delete(localUrl,{headers: this.headers})
      .toPromise()
      .then(res => {
        //       console.log(res.json() as Addresses);
        return res.json()})
      .catch(this.handleError);



  }

}
