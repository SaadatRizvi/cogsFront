import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import {LoginRequest} from './loginRequest.dto';
import {LoginRes} from './loginRes.dto';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthenticateService {
  private url = 'http://localhost:8089/authenticate';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  authenticateUser(data: LoginRequest): Promise<LoginRes> {
    return this.http
      .post(this.url, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => {
        console.log(res.json());
        return res.json() as LoginRes})
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

