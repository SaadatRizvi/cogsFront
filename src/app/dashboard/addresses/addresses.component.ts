import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {Addresses} from './addresses.dto';
import 'rxjs/add/operator/switchMap';



import {AddressesService} from './addresses.service'

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
    private location: Location) {  }

  ngOnInit(): void {
   // console.log('Address.component.ts');
   // console.log(this.localStorage.getItem('token'));

    this.route.paramMap
      .switchMap((params: ParamMap) => this.addressService.getAddresses(+params.get('id')))
      .subscribe(addresses => {
 //       console.log("addresses: "+addresses);
        this.addresses = addresses});

  }

}
