import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {ContactDetails} from './contact-details.dto';
import 'rxjs/add/operator/switchMap';

import {ContactDetailsService} from './contact-details.service'
import {CoolLocalStorage} from "angular2-cool-storage";
import {Validator} from '../../common/lib/validator';
import {formErrors} from './contactDetailsValidator';
import {validationMessages} from './contactDetailsValidator';
import {isDisabled} from './contactDetailsValidator';
import {ContactDetailsValidator} from './contactDetailsValidator';
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  providers: [ContactDetailsService]
})
export class ContactDetailsComponent implements OnInit {

  contactDetails: ContactDetails;
  isEditEnabled: boolean;
  tempDetails: ContactDetails;
  updateError: string;
  validator: Validator;
  formErrors: any;
  validationMessages: any;
  ContactDetailsValidator: ContactDetailsValidator;
  isAddEnabled: boolean;
  constructor(
    private contactDetailsService: ContactDetailsService,
    private route: ActivatedRoute,
    private localStorage: CoolLocalStorage,
  ) {
    this.formErrors=formErrors;
    this.validationMessages=validationMessages;
    this.ContactDetailsValidator=new ContactDetailsValidator();
    this.isEditEnabled=false;
    this.isAddEnabled=false;
    this.contactDetails=new ContactDetails();

  }

  ngOnInit(): void {
    // this.isEditEnabled=false;
    // this.isAddEnabled=false;
    //
    this.contactDetailsService.getContactDetails(+this.localStorage.getItem('id'))
      .then(contactDetails =>  {
        // console.log(contactDetails);
        if(contactDetails.length>0) this.contactDetails=contactDetails[0];
        // else this.isAddEnabled=true;
      });

  }

  isDisabled(): boolean{
    return isDisabled;
  }

  resetTemp(): void{
    this.tempDetails = new ContactDetails();
  }

  enableEdit(): void{
    this.tempDetails=Object.assign({},this.contactDetails);
    this.isEditEnabled = true;
  }

  disableEdit(): void{
    this.isEditEnabled=false;
    this.tempDetails = new ContactDetails();
  }

  update(): void{
    this.contactDetailsService.update(this.tempDetails)
      .then(res=> {
        if(res == 1){
            this.contactDetails=this.tempDetails;
        }
        else{
          this.updateError="There was some problem updating";
        }
      }).then(()=>{
      this.tempDetails = new ContactDetails();
      this.isEditEnabled = false;
    });

  }

  enableAdd(): void {
    this.tempDetails = new ContactDetails();
    this.isEditEnabled = false;
    this.isAddEnabled = true;

  }

  disableAdd(): void {
    this.isAddEnabled = false;
    this.resetTemp();
  }

  add(): void {
    let data = JSON.stringify(this.tempDetails);
    let newData = Object.assign({EmployeeId: this.localStorage.getItem('id')}, this.tempDetails);

    //this.addresses.push(this.tempAddress)

    console.log(newData)
    this.contactDetailsService.create(newData)
      .then(res => {
        // console.log('res; ');
        //
        // console.log(res);
        if (res) {
          //console.log(this.contactDetails);
          this.contactDetails=this.tempDetails;
          this.disableAdd();
        }
      });
  }

  contactForm: NgForm;
  @ViewChild('contactForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.contactForm) {
      return;
    }
    this.contactForm = this.currentForm;
    if (this.contactForm) {
      this.contactForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }


  onValueChanged(data?: any) {
    if (!this.contactForm) {
      return;
    }
    const form = this.contactForm.form;
    this.ContactDetailsValidator.setDisabled();

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);


      let errors = [];

      if ((control && control.dirty && !control.valid) || (control && !this.ContactDetailsValidator.validate(field, errors,this.tempDetails[field]))) {
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


}
