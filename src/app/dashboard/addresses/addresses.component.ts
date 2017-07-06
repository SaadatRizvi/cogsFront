import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Addresses} from './addresses.dto';
import 'rxjs/add/operator/switchMap';



import {AddressesService} from './addresses.service'
import {CoolLocalStorage} from "angular2-cool-storage";
import {Validator} from "../../common/lib/validator";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css'],
  providers: [AddressesService]
})
export class AddressesComponent implements OnInit {
  addresses: Addresses[];
 // address: Addresses;
  isEditEnabled: boolean;
  tempAddress: Addresses;
  isAddEnabled: boolean;

  types = ['Temporary', 'Permanent'];

  constructor(
    private addressService: AddressesService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: CoolLocalStorage,
  ) {
  }

  ngOnInit(): void {
   // console.log('Address.component.ts');
   // console.log(this.localStorage.getItem('token'));

    this.isEditEnabled=false;
    this.isAddEnabled=false;
    this.resetTemp();
    this.addressService.getAddresses(+this.localStorage.getItem('id'))
      .then((result) => {
        this.addresses=result;
    });


 //    this.route.paramMap
 //      .switchMap((params: ParamMap) => this.addressService.getAddresses(+params.get('id')))
 //      .subscribe(addresses => {
 // //       console.log("addresses: "+addresses);
 //        this.addresses = addresses});

  }

  resetTemp(): void{

    this.tempAddress = new Addresses(null,null,null,null,null);
  }

  enableEdit(index: number): void{
    this.isAddEnabled=false;
    this.tempAddress=Object.assign({},this.addresses[index]);
    this.isEditEnabled = true;


    console.log('EnableEdit id-->  '+this.tempAddress.id);

  }

  disableEdit(): void{
    this.isEditEnabled=false;
    //(


     this.router.navigate([this.router.url]);

    this.tempAddress = new Addresses(null,null,null,null,null);



  }

  update(): void{
    console.log('before() id--> '+ this.tempAddress.id )

    let id=this.tempAddress.id;
    this.addressService.update(this.tempAddress)
      .then(res=> {
      console.log('update() --> '+res );
      console.log('after() --> '+ this.tempAddress.id );
      console.log('after() --> '+ this.tempAddress.city );


        if(res == 1){

        for(let i=0;i<this.addresses.length;i++){
          console.log("for i= "+i);
          console.log("this.addresses[i].id= "+this.addresses[i].id);
          console.log("this.tempAddress.id= "+this.tempAddress.id);
          if (this.addresses[i].id===this.tempAddress.id){

            this.addresses[i]=this.tempAddress;
            console.log("done");break;

          }
        }
      }
    }).then(()=>{
      this.tempAddress = new Addresses(null,null,null,null,null);
    });

  //
    this.isEditEnabled = false;

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
    let data = JSON.stringify(this.tempAddress);
    let newData = Object.assign({EmployeeId: this.localStorage.getItem('id')} , this.tempAddress);

    console.log(newData)
    this.addressService.create(newData).then(res=> this.addresses.push(res as Addresses));
    this.disableAdd()   ;

  }

  validateStreet(): boolean{
    return Validator.isAlpha(this.tempAddress.street);
  }
  validateCity(): boolean{
    return Validator.isAlpha(this.tempAddress.city);
  }
  validateCountry(): boolean{
    return Validator.isAlpha(this.tempAddress.country);
  }
  validateType(): boolean{
    return Validator.isAlpha(this.tempAddress.type);
  }

}
