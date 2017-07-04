import { OnInit } from '@angular/core';


export class Token implements OnInit {

  private static token: string;
  static baseUrl='http://localhost:4100/';

  ngOnInit(): void {
    Token.token=null;
   // Token.baseUrl=;
  }

  static  setToken(token: string){
    Token.token=token;
  }
  static  getToken(){
    return Token.token
  }
}
