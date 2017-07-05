import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {Employee} from './employee.dto'
import {EmployeeService} from './employee.service'
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeeComponent implements OnInit {
  employee: Employee;
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private localStorage: CoolLocalStorage
  ) {
  }

  ngOnInit() {
    this.employeeService.getEmployee(+this.localStorage.getItem('id'))
      .then(employee =>  this.employee=employee);
  }

}
