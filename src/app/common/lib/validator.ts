

import {isNullOrUndefined} from "util";

export class Validator {

  constructor() { }

  static isAscii(data: string): boolean{
    let ck_name = /[ -~]$/;
    if (!ck_name.test(data)) {
      return false;
    }
    else {
      return true;
    }
  }
  static isAlphaNumeric(data: string) : boolean{
    let ck_name = /^[A-Za-z0-9]*$/;
    if (!ck_name.test(data)) {
      return false;
    }
    else {
      return true;
    }
  }
  static isAlpha(data: string) : boolean{
    let ck_name = /^[A-Za-z]*$/;
    if (!ck_name.test(data)) {
      return false;
    }
    else {
      return true;
    }
  }
  static isNumber(data: string) : boolean{
    let ck_name = /^[0-9]*$/;
    if (!ck_name.test(data)) {
      return false;
    }
    else {
      return true;
    }
  }
  static isFloat(data: string) : boolean{
    let ck_name =/ ^\d{0,2}(\.\d{0,2}){0,1}$/;
    if (!ck_name.test(data)) {
      return false;
    }
    else {
      return true;
    }
  }
  static isEmail(data: string) : boolean{
    var ck_name = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!ck_name.test(data)) {
      return false;
    }
    else {
      return true;
    }
  }

  static isNullOrUndefined(data: string){
      return isNullOrUndefined(data) || (''=== data);
  }

}
