import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {Addresses} from './addresses.dto';
import 'rxjs/add/operator/switchMap';



import {AddressesService} from './addresses.service'
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css'],
  providers: [AddressesService]
})
export class AddressesComponent implements OnInit {
  addresses: Addresses;




  constructor(
    private addressService: AddressesService,
    private route: ActivatedRoute,
    private localStorage: CoolLocalStorage
  ) {
  }

  ngOnInit(): void {
   // console.log('Address.component.ts');
   // console.log(this.localStorage.getItem('token'));

    this.addressService.getAddresses(+this.localStorage.getItem('id'))
      .then(addresses =>  this.addresses=addresses);


 //    this.route.paramMap
 //      .switchMap((params: ParamMap) => this.addressService.getAddresses(+params.get('id')))
 //      .subscribe(addresses => {
 // //       console.log("addresses: "+addresses);
 //        this.addresses = addresses});

  }

}
