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
    'x-access-token': this.localStorage.getItem('token')});

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

  getProjects(id: number): Promise<Projects> {
    this.url+='?EmployeeId='+id;
    console.log(this.url);
    console.log();
    return this.http
      .get(this.url, {headers: this.headers})
      .toPromise()
      .then(res => {
        console.log(res.json());
        return res.json() as Projects})
      .catch(this.handleError);
  }
}
