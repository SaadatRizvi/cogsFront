import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Projects} from './projects.dto';
import {Token}  from '../../token'



import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from "angular2-cool-storage";


@Injectable()
export class ProjectService {

  localStorage: CoolLocalStorage;
  constructor(private http: Http,
              private token: Token,
              localStorage: CoolLocalStorage
  )
  {     this.localStorage = localStorage;
  }
  private url=this.token.baseUrl + 'projects';
  private headers = new Headers({'Content-Type': 'application/json',
    'x-access-token': 'NotSet'});

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

  getProjects(id: number): Promise<Projects[]> {
    let localUrl=this.url+'?EmployeeId='+id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));
    return this.http
      .get(localUrl, {headers: this.headers})
      .toPromise()
      .then(res => {
        return res.json() as Projects[]})
      .catch(this.handleError);
  }
  update(data: Projects){

    let localUrl=this.url+'/'+data.id;
    this.headers.set('x-access-token',this.localStorage.getItem('token'));
    return this.http
      .put(localUrl, data,{headers: this.headers})
      .toPromise()
      .then(res => {
        //       console.log(res.json() as Addresses);
        return res.json()})
      .catch(this.handleError);


  }
  create(data: any): Promise<any> {
    //console.log(data)
    this.headers.set('x-access-token',this.localStorage.getItem('token'));

    return this.http
      .post(this.url, data, {headers: this.headers})
      .toPromise()
      .then(res => {
        // console.log(res.json());
        if(res.json().created){
          let newData=res.json();
          delete newData.created;
          return newData
        }
        else{
          console.log(res)
          return Object.assign({message:'There was a problem'},res.json());

        }
      })
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
