import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Address} from './address.dto';
import 'rxjs/add/operator/switchMap';

import {formErrors} from './address.validator';
import {validationMessages} from './address.validator';
import {isDisabled} from './address.validator';


import {AddressService} from './addresses.service'
import {CoolLocalStorage} from "angular2-cool-storage";
import {Validator} from "../../common/lib/validator";
import {NgForm} from "@angular/forms";
import {AddressValidator} from "./address.validator";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-addresses',
  templateUrl: './address.component.html',
  providers: [AddressService]
})
export class AddressComponent implements OnInit {
  updateError: string;
  addresses: Address[];

  isEditEnabled: boolean;
  tempAddress: Address;
  isAddEnabled: boolean;
  addressesValidator: AddressValidator;
  formErrors: any;
  validationMessages: any;


  types = ['Temporary', 'Permanent'];

  constructor(private addressService: AddressService,
              private route: ActivatedRoute,
              private router: Router,
              private localStorage: CoolLocalStorage,) {

  }


  ngOnInit(): void {

    this.formErrors = formErrors;
    this.validationMessages = validationMessages;
    this.addressesValidator = new AddressValidator();
    this.isEditEnabled = false;
    this.isAddEnabled = false;
    this.resetTemp();
    this.addressService.getAddress(+this.localStorage.getItem('id'))
      .then((result) => {
        this.addresses = result;
        this.checkToAddMore();
      });


  }


  isDisabled(): boolean {
    return isDisabled;
  }


  addressForm: NgForm;
  @ViewChild('addressForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.addressForm) {
      return;
    }
    this.addressForm = this.currentForm;
    if (this.addressForm) {
      this.addressForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }


  onValueChanged(data?: any) {
    if (!this.addressForm) {
      return;
    }
    const form = this.addressForm.form;
    this.addressesValidator.setDisabled();

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      let errors = [];

      let validatonCheck: boolean;

      if (field === 'type') {
        let types = new Array<string>();

        for (let addr of this.addresses) {
          types.push(addr.type);
        }

        validatonCheck = !this.addressesValidator.validate(field, errors, this.tempAddress[field], this.addresses.length, types,this.isEditEnabled,)
      }
      else {
        validatonCheck = !this.addressesValidator.validate(field, errors, this.tempAddress[field])

      }


      if ((control && control.dirty && !control.valid) || (control && validatonCheck)) {
        const messages = this.validationMessages[field];

        if (control.errors) {
          errors.push(control.errors);
        }

        for (const key of errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  checkToAddMore(): boolean {
    if (this.addresses.length >= 2) {
      return false;
    }
    return true;
  }

  resetTemp(): void {
    this.tempAddress = new Address(null, null, null, null, null);
  }

  enableEdit(index: number): void {
    this.isAddEnabled = false;
    this.tempAddress = Object.assign({}, this.addresses[index]);
    this.isEditEnabled = true;

  }

  disableEdit(): void {
    this.isEditEnabled = false;
    this.resetTemp();
  }

  update(): void {
    let id = this.tempAddress.id;
    this.addressService.update(this.tempAddress)
      .then(res => {

        if (res == 1) {
          for (let i = 0; i < this.addresses.length; i++) {

            if (this.addresses[i].id === id) {
              this.addresses[i] = this.tempAddress;
            }
            else {
              this.updateError = "There was some problem updating";
            }
          }
        }
      }).then(() => {
      this.resetTemp();
      this.isEditEnabled = false;
    });

  }

  enableAdd(): void {
    this.resetTemp();
    this.isEditEnabled = false;
    this.isAddEnabled = true;
  }



  disableAdd(): void {
    this.isAddEnabled = false;
    this.resetTemp();
  }

  add(): void {
    let data = JSON.stringify(this.tempAddress);
    let newData = Object.assign({EmployeeId: this.localStorage.getItem('id')}, this.tempAddress);

    this.addressService.create(newData)
      .then(res => {

        if (isNullOrUndefined(res.message)) {
          this.addresses.push(res as Address)
          this.disableAdd();

          this.checkToAddMore();

        }

        else {
          this.updateError=res.message;
        }
      });

  }


  delete(index: number): void {
    let id = this.addresses[index].id;
    let addr: Address = this.addresses[index];

    this.addressService.delete(id)
      .then((res) => {
        if (res.message === "done") {
          this.addresses = this.addresses.filter(h => h !== addr);
         }
      })

  }

}
