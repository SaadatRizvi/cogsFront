import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Employments} from "./employment.dto";
import {EmploymentService} from "./employment.service";

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
  ) {}
  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.employmentService.getEmployment(+params.get('id')))
      .subscribe(employment => this.employment = employment);
  }

}
