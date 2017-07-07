import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {ContactDetails} from './contact-details.dto';
import 'rxjs/add/operator/switchMap';

import {ContactDetailsService} from './contact-details.service'
import {CoolLocalStorage} from "angular2-cool-storage";
import {Validator} from '../../common/lib/validator';
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
  constructor(
    private contactDetailsService: ContactDetailsService,
    private route: ActivatedRoute,
    private localStorage: CoolLocalStorage,

  ) {

  }

  ngOnInit(): void {
    this.isEditEnabled=false;
    this.contactDetailsService.getContactDetails(+this.localStorage.getItem('id'))
      .then(contactDetails =>  this.contactDetails=contactDetails);

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

  validateEmail(email: string){
    return Validator.isEmail(email)
  }
}
