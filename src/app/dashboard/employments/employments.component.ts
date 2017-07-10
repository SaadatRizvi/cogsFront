import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Employments} from './employments.dto';
import 'rxjs/add/operator/switchMap';

import {formErrors} from './employment.validator';
import {validationMessages} from './employment.validator';
import {isDisabled} from './employment.validator';


import {EmploymentsService} from './employments.service'
import {CoolLocalStorage} from "angular2-cool-storage";
import {Validator} from "../../common/lib/validator";
import {NgForm} from "@angular/forms";
import {EmploymentsValidator} from "./employment.validator";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-employments',
  templateUrl: './employments.component.html',
  providers: [EmploymentsService]
})
export class EmploymentsComponent implements OnInit {
  updateError: string;
  employments: Employments[];

  isEditEnabled: boolean;
  tempEmployments: Employments;
  isAddEnabled: boolean;
  employmentsValidator: EmploymentsValidator;
  formErrors: any;
  validationMessages: any;



  constructor(private employmentService: EmploymentsService,
              private route: ActivatedRoute,
              private router: Router,
              private localStorage: CoolLocalStorage,) {

  }


  ngOnInit(): void {

    this.formErrors = formErrors;
    this.validationMessages = validationMessages;
    this.employmentsValidator = new EmploymentsValidator();
    this.isEditEnabled = false;
    this.isAddEnabled = false;
    this.resetTemp();
    this.employmentService.getEmployments(+this.localStorage.getItem('id'))
      .then((result) => {
        this.employments = result;
      });


  }


  isDisabled(): boolean {
    return isDisabled;
  }


  employmentForm: NgForm;
  @ViewChild('employmentForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.employmentForm) {
      return;
    }
    this.employmentForm = this.currentForm;
    if (this.employmentForm) {
      this.employmentForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }


  onValueChanged(data?: any) {
    if (!this.employmentForm) {
      return;
    }

    const form = this.employmentForm.form;
    this.employmentsValidator.setDisabled();

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      let errors = [];

      let validatonCheck: boolean;

      if (field === 'leavingDate') {
       validatonCheck = !this.employmentsValidator.validate(field, errors, this.tempEmployments[field],this.tempEmployments.joiningDate);
      }
      else {
        validatonCheck = !this.employmentsValidator.validate(field, errors, this.tempEmployments[field])

      }


      if ((control && control.dirty && !control.valid) || (control && validatonCheck)) {
        const messages = this.validationMessages[field];

        if (control.errors) {
          errors.push(control.errors);
        }

        for (const key of errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }




  resetTemp(): void {
    this.tempEmployments = new Employments(null, null,null, null, null, null);
  }

  enableEdit(index: number): void {
    this.isAddEnabled = false;
    this.tempEmployments = Object.assign({}, this.employments[index]);

    this.isEditEnabled = true;

  }

  disableEdit(): void {
    this.isEditEnabled = false;
    this.resetTemp();
  }

  update(): void {
    let id = this.tempEmployments.id;
    this.employmentService.update(this.tempEmployments)
      .then(res => {

        if (res == 1) {
          for (let i = 0; i < this.employments.length; i++) {

            if (this.employments[i].id === id) {
              this.employments[i] = this.tempEmployments;
            }
            else {
              this.updateError = "There was some problem updating";
            }
          }
        }
      }).then(() => {
      this.resetTemp();
      this.isEditEnabled = false;
    });

  }

  enableAdd(): void {
    this.resetTemp();
    this.isEditEnabled = false;
    this.isAddEnabled = true;
  }



  disableAdd(): void {
    this.isAddEnabled = false;
    this.resetTemp();
  }

  add(): void {
    let data = JSON.stringify(this.tempEmployments);
    let newData = Object.assign({EmployeeId: this.localStorage.getItem('id')}, this.tempEmployments);

    this.employmentService.create(newData)
      .then(res => {

        if (isNullOrUndefined(res.message)) {
          this.employments.push(res as Employments);
          this.disableAdd();

        }

        else {
          this.updateError=res.message;
        }
      });

  }


  delete(index: number): void {
    let id = this.employments[index].id;
    let addr: Employments = this.employments[index];

    this.employmentService.delete(id)
      .then((res) => {
        if (res.message === "done") {
          this.employments = this.employments.filter(h => h !== addr);
        }
      })

  }

}
