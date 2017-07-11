import {
  Component,
  ElementRef,
  OnInit,
  Renderer,
  AfterContentInit,
  ContentChild,
  AfterViewChecked,
  AfterViewInit,
  Renderer2,
  ViewChild,
  ViewChildren, NgModule, CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {Employee} from './employee.dto'
import {EmployeeService} from './employee.service'
import {CoolLocalStorage} from "angular2-cool-storage";
import {Validator} from "../../common/lib/validator";
import {InlineEditorModule} from '@qontu/ngx-inline-editor';

@NgModule({
  imports: [
    InlineEditorModule
  ]
})

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService],

})
export class EmployeeComponent implements OnInit {
  employee: Employee;
  genderEdit: boolean;
  maritalEdit: boolean;
  emailEdit: boolean;
  tempEmployee: Employee;
  @ViewChildren('editGender') editGender;
  @ViewChildren('editStatus') editStatus;

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private localStorage: CoolLocalStorage,
             ) {
    this.genderEdit = false;
    this.maritalEdit = false;
    this.emailEdit=false;
    this.setNull();
  }

  ngOnInit() {
    this.employeeService.getEmployee(+this.localStorage.getItem('id'))
      .then(employee => this.employee = employee);
  }

  enableEdit(data: string) {
    this.tempEmployee=this.employee;
    if (data === 'gender') {
      this.genderEdit = true;
    }
    if (data === 'maritalStatus') {
      this.maritalEdit = true;
    }
    if(data === 'email'){
      this.emailEdit=true;
    }
  }

  disableEdit(data: string) {
    this.employee = this.tempEmployee;

    if (data === 'gender') {
        this.genderEdit = false;

      }

    if (data === 'maritalStatus') {
      this.maritalEdit = false;
    }
    if(data === 'email'){
      this.emailEdit=false;
    }
  }

  setNull(){
    this.tempEmployee=new Employee();
  }
  save(data: string) {
    this.maritalEdit=false;
    this.genderEdit=false;
    this.emailEdit=false;
    let updateData=Object.assign({},this.tempEmployee);
    this.employeeService.update(updateData).then((res) => {
      console.log(res);
      if(res[0]){
        this.employee=this.tempEmployee;
        this.setNull();
      }
    })
  }


}
