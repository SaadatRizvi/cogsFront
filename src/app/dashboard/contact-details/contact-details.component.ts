import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {ContactDetails} from './contact-details.dto';
import 'rxjs/add/operator/switchMap';

import { CoolLocalStorage } from 'angular2-cool-storage';


import {ContactDetailsService} from './contact-details.service'

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  providers: [ContactDetailsService]
})
export class ContactDetailsComponent implements OnInit {
  contactDetails: ContactDetails;

  localStorage: CoolLocalStorage;


  constructor(
    private addressService: ContactDetailsService,
    private route: ActivatedRoute,
    private location: Location,
    localStorage: CoolLocalStorage
  ) {     this.localStorage = localStorage;
  }

  ngOnInit(): void {

    this.route.paramMap
      .switchMap((params: ParamMap) => this.addressService.getContactDetails(+params.get('id')))
      .subscribe(contactDetails => this.contactDetails = contactDetails);
  }

}
