import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {Addresses} from './addresses.dto';
import 'rxjs/add/operator/switchMap';

import { CoolLocalStorage } from 'angular2-cool-storage';


import {AddressesService} from './addresses.service'

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css'],
  providers: [AddressesService]
})
export class AddressesComponent implements OnInit {
  addresses: Addresses;

  localStorage: CoolLocalStorage;


  constructor(
    private addressService: AddressesService,
    private route: ActivatedRoute,
    private location: Location,
    localStorage: CoolLocalStorage
  ) {     this.localStorage = localStorage;
  }

  ngOnInit(): void {
    console.log('Address.component.ts');
    console.log(this.localStorage.getItem('token'));

    this.route.paramMap
      .switchMap((params: ParamMap) => this.addressService.getAddresses(+params.get('id')))
      .subscribe(addresses => this.addresses = addresses);
  }

}