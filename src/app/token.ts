import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

@Injectable()
export class Token  {

  @LocalStorage() public   token: string='';
   baseUrl='http://localhost:4100/';



  setToken(token: string){
    this.token=token;
  }
    getToken(){
    return this.token;
  }
}
