import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Addresses} from './addresses.dto';
import 'rxjs/add/operator/switchMap';


import {AddressesService} from './addresses.service'
import {CoolLocalStorage} from "angular2-cool-storage";
import {Validator} from "../../common/lib/validator";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css'],
  providers: [AddressesService]
})
export class AddressesComponent implements OnInit {
  addresses: Addresses[];
  // address: Addresses;
  enableSubmitable: boolean[];
  isEditEnabled: boolean;
  tempAddress: Addresses;
  isAddEnabled: boolean;
  formErrors = {
    street: null,
    city: null,
    country: null,
    type: null
  };

  validationMessages = {
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
      'alpha': 'Must contain alphabets only',
      'duplicateType': 'A Type(Temp or Permanent) can contain only 1 address'

    }
  };


  types = ['Temporary', 'Permanent'];

  addressForm: NgForm;
  @ViewChild('addressForm') currentForm: NgForm;

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked()');
    this.formChanged();
    this.isSubmitable();
  }

  formChanged() {
    if (this.currentForm === this.addressForm) {
      return;
    }
    this.addressForm = this.currentForm;
    if (this.addressForm) {
      console.log('21');
      this.addressForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }


  onValueChanged(data?: any) {
    if (!this.addressForm) {
      return;
    }
    const form = this.addressForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      //  console.log(field);
      //console.log(form.get(field));

      let errors = [];

      if ((control && control.dirty && !control.valid) || (control && !this.validate(field, errors))) {
        const messages = this.validationMessages[field];

        if (control.errors) {
          errors.push(control.errors);
          console.log(errors);
          console.log(field)
        }

        for (const key of errors) {
          console.log('key= ' + key);
          console.log(messages[key]);
          this.formErrors[field] += messages[key] + ' ';
        }
      }
           }
  }

  validateStreet(errors: Array<any>): boolean {
    let returnVal = true;

    if (!Validator.isAlphaNumeric(this.tempAddress.street)) {
      errors.push('alpha');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(this.tempAddress.street)) {
      errors.push('required');
      returnVal = false;
    }
    return returnVal;

  }

  validateCity(errors: Array<any>): boolean {
    let returnVal = true;

    if (!Validator.isAlpha(this.tempAddress.city)) {
      errors.push('alpha');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(this.tempAddress.city)) {
      errors.push('required');
      returnVal = false;
    }
    return returnVal;

  }

  validateCountry(errors: Array<any>): boolean {
    let returnVal = true;

    if (!Validator.isAlpha(this.tempAddress.country)) {
      errors.push('alpha');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(this.tempAddress.country)) {
      errors.push('required');
      returnVal = false;
    }
    return returnVal;

  }

  validateType(errors: Array<any>): boolean {

    let returnVal = true;

    if (!Validator.isAlpha(this.tempAddress.type)) {
      errors.push('alpha');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(this.tempAddress.type)) {
      errors.push('required');
      returnVal = false;
    }


    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i].type === this.tempAddress.type) {
        errors.push('duplicateType')
        returnVal = false;
      }

    }


    return returnVal;

  }

  validate(fieldName: String, errors: Array<any>): boolean {
    if (fieldName === 'city') return this.validateCity(errors);

    if (fieldName === 'street') return this.validateStreet(errors);
    if (fieldName === 'type') return this.validateType(errors);
    if (fieldName === 'country') return this.validateCountry(errors);

  }


  constructor(private addressService: AddressesService,
              private route: ActivatedRoute,
              private router: Router,
              private localStorage: CoolLocalStorage,) {
    //  this.formErrors=this.addressService.formErrors;
  }

  ngOnInit(): void {
    // console.log('Address.component.ts');
    // console.log(this.localStorage.getItem('token'));
    this.enableSubmitable=new Array(4);
    for(let i=0;i<this.enableSubmitable.length;i++){
      this.enableSubmitable[i] = false;
    }
    console.log("enableSubmit -- > ");
    console.log(this.enableSubmitable);
    this.isEditEnabled = false;
    this.isAddEnabled = false;
    this.resetTemp();
    //this.formErrors=this.addressService.formErrors;
    //  this.validationMessages=this.addressService.validationMessages;
    this.addressService.getAddresses(+this.localStorage.getItem('id'))
      .then((result) => {
        this.addresses = result;
      });

  }

  resetTemp(): void {

    this.tempAddress = new Addresses(null, null, null, null, null);
  }

  enableEdit(index: number): void {
    this.isAddEnabled = false;
    this.tempAddress = Object.assign({}, this.addresses[index]);

    this.isEditEnabled = true;


    console.log('EnableEdit id-->  ' + this.tempAddress.id);

  }

  disableEdit(): void {
    this.isEditEnabled = false;
    //(


    this.router.navigate([this.router.url]);

    this.tempAddress = new Addresses(null, null, null, null, null);


  }

  update(): void {
    console.log('before() id--> ' + this.tempAddress.id)

    let id = this.tempAddress.id;
    this.addressService.update(this.tempAddress)
      .then(res => {
        // console.log('update() --> '+res );
        // console.log('after() --> '+ this.tempAddress.id );
        // console.log('after() --> '+ this.tempAddress.city );


        if (res == 1) {
          for (let i = 0; i < this.addresses.length; i++) {
            // console.log("for i= "+i);
            // console.log("this.addresses[i].id= "+this.addresses[i].id);
            console.log("this.tempAddress.id= "+this.tempAddress.type);
            if (this.addresses[i].id === id) {

              this.addresses[i] = this.tempAddress;
               console.log(this.tempAddress)

            }
          }
        }
      }).then(() => {
      this.tempAddress = new Addresses(null, null, null, null, null);
    });

    //
    this.isEditEnabled = false;

  }

  enableAdd(): void {
    this.tempAddress = new Addresses(null, null, null, null, null);
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

    //this.addresses.push(this.tempAddress)

    console.log(newData)
    this.addressService.create(newData)
      .then(res => {
        console.log('res; ');

        console.log(res);
        if (res) {
          debugger;
          console.log(this.tempAddress);
         this.addresses.push(this.tempAddress)
          this.disableAdd();
        }
      });
    //
    //
    //this.addresses.push(this.tempAddress)
  }

  delete(index: number):void{
    let id= this.addresses[index].id;
    this.tempAddress=this.addresses[index];
    this.addressService.delete(id)
      .then(res=>{
        if(res.message === "done") {
          console.log("After Delete: ");
          console.log(res);
          //delete this.addresses[index];
          this.addresses = this.addresses.filter(h => h !== this.tempAddress);
          this.resetTemp();
        }
      })

  }


  // 'street' -----0
  // 'city'-----1
  // 'country'-----2
  // 'type'-----3


    isSubmitable(): boolean{
//sequence of errors is the same as sequence of validation messages

    for(let key in this.formErrors) {
      if (this.formErrors[key]==='') {
      //  console.log("True hai");
        if(key === 'street' )this.enableSubmitable[0] = true;
        if(key === 'city' )this.enableSubmitable[1] = true;
        if(key === 'country' )this.enableSubmitable[2] = true;
        if(key === 'type' )this.enableSubmitable[3] = true;
        // console.log(key);
        // console.log(this.formErrors[key]);
        //
        // console.log("True hai");

      }
      else{

        if(key === 'street' )this.enableSubmitable[0] = false;
        if(key === 'city' )this.enableSubmitable[1] = false;
        if(key === 'country' )this.enableSubmitable[2] = false;
        if(key === 'type' )this.enableSubmitable[3] = false;

      }
      //console.log("False hai");

    }
      for(let i=0;i<this.enableSubmitable.length;i++){
        console.log(this.enableSubmitable[i]);

      if(this.enableSubmitable[i]===false) {
        console.log(this.enableSubmitable[i]);
        return false;

      }
      }
      return true;
  }





}






























// for(let key in this.formErrors){
//   if(Validator.isNullOrUndefined(this.formErrors[key]) )
//   {
//     return false;
//
//   }
// }
// return true;
