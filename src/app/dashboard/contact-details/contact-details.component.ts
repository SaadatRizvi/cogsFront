import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {ContactDetails} from './contact-details.dto';
import 'rxjs/add/operator/switchMap';

import {ContactDetailsService} from './contact-details.service'
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  providers: [ContactDetailsService]
})
export class ContactDetailsComponent implements OnInit {

  contactDetails: ContactDetails;



  constructor(
    private contactDetailsService: ContactDetailsService,
    private route: ActivatedRoute,
    private localStorage: CoolLocalStorage
  ) {

  }


  ngOnInit(): void {

    this.contactDetailsService.getContactDetails(+this.localStorage.getItem('id'))
      .then(contactDetails =>  this.contactDetails=contactDetails);

  }

}
