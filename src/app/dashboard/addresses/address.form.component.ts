import { Component } from '@angular/core';
import {Addresses} from "./addresses.dto";
import {until} from "selenium-webdriver";
import elementIsDisabled = until.elementIsDisabled;


@Component({
  selector: 'address-form',
  templateUrl: './address.form.component.html'
})
export class AddressFormComponent {
  address: Addresses;
  error: string;
  submitted:boolean;
  isDisabled:boolean;
  constructor(){
    this.address=new Addresses();
    this.isDisabled=true;
  }

  formValidator() {

  }

  validateStreet(){
    let ck_name = /^[A-Za-z0-9!@#$%^&*()_]{0,50}$/;
    if (!ck_name.test(this.address.street)) {
      this.error="Not in correct format!";
      this.isDisabled=true;
    }
    else{
      this.isDisabled=false;
      this.error=null;
    }
  }
  validateCity(){
    let ck_name = /^[A-Za-z ]{0,50}$/;
    if (!ck_name.test(this.address.city)) {
      this.error="Not in correct format!";
      this.isDisabled=true;
    }
    else{
      this.isDisabled=false;
      this.error=null;
    }
  }

   onSubmit() { this.submitted = true; }
 //
 //  // TODO: Remove this when we're done
 //  get diagnostic() { return JSON.stringify(this.model); }
}
