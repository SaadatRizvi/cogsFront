import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {CoolLocalStorage} from "angular2-cool-storage";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(
              private localStorage: CoolLocalStorage) {}

  canActivate() {
    return this.localStorage.getItem('id') ? true : false;
  }
}
