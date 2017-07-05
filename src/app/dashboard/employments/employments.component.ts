import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Employments} from "./employments.dto";
import {EmploymentService} from "./employments.service";
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'app-employments',
  templateUrl: './employments.component.html',
  styleUrls: ['./employments.component.css'],
  providers: [ EmploymentService ]
})
export class EmploymentsComponent implements OnInit {

  employment: Employments;

  constructor(
    private employmentService: EmploymentService,
    private route: ActivatedRoute,
    private localStorage: CoolLocalStorage
  ) {
  }
  ngOnInit() {

    this.employmentService.getEmployment(+this.localStorage.getItem('id'))
      .then(employment =>  this.employment=employment);
  }

}
