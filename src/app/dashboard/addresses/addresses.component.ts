import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
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
  isEditEnabled: boolean;
  tempAddress: Addresses;
  isAddEnabled: boolean;


  constructor(
    private addressService: AddressesService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: CoolLocalStorage
  ) {
  }

  ngOnInit(): void {
   // console.log('Address.component.ts');
   // console.log(this.localStorage.getItem('token'));

    this.isEditEnabled=false;
    this.isAddEnabled=false;
    this.resetTemp();
    this.addressService.getAddresses(+this.localStorage.getItem('id'))
      .then(addresses =>  this.addresses=addresses);


 //    this.route.paramMap
 //      .switchMap((params: ParamMap) => this.addressService.getAddresses(+params.get('id')))
 //      .subscribe(addresses => {
 // //       console.log("addresses: "+addresses);
 //        this.addresses = addresses});

  }

  resetTemp(): void{

    this.tempAddress = new Addresses();
  }

  enableEdit(): void{
    this.isEditEnabled = true;
    this.isAddEnabled=false;
  }

  disableEdit(): void{
    this.isEditEnabled=false;
    //(

     this.router.navigate([this.router.url]);
     console.log()
  }

  update(): void{
    this.addressService.update(this.addresses);
}
  enableAdd(): void{
    this.isAddEnabled = true;
    this.isEditEnabled=false;
  }
  disableAdd(): void{
    this.isAddEnabled=false;
    this.resetTemp();
  }
  add(): void{
    let data={
      street: this.tempAddress.street,
      city: this.tempAddress.city,
      country: this.tempAddress.country,
      type: this.tempAddress.type,
      EmployeeId:this.localStorage.getItem('id')
    };

    this.addressService.create(data).then(res=>console.log(res));
    this.disableAdd();

  }

}
