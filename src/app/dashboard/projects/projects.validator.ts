import {Validator} from "../../common/lib/validator";
import {NgForm} from "@angular/forms";
import {ViewChild} from "@angular/core";
export var formErrors = {
  name: null,
  leavingDate: null,
  technologies: null,
  role: null,
  joiningDate: null,
};

export const validationMessages = {
  'name': {
    'required': 'Required.',
    'alphaNumeric': 'Must contain alphabets and numerics only',
  },
  'role': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only',
  },
  'technologies': {
    'ascii': 'Must contain ascii only',
  },
  'joiningDate': {
    'required': 'Required.',
    'date': 'Must be a date in the following format: YYYY/MM/DD',
  },
  'leavingDate': {
    'date': 'Must be a date in the following format: YYYY/MM/DD',
    'notBeforeJoiningDate': 'Leaving Date must be after Joining Date'
  }
};

export var isDisabled: boolean =true  ;

export class ProjectsValidator {

    constructor(){
    isDisabled=true;
  }

  validateAlpha(errors: Array<any>, data: string): boolean {
    let returnVal = true;

    if (!Validator.isAlpha(data)) {
      errors.push('alpha');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled=returnVal && isDisabled;
    return returnVal;

  }
  validateName(errors: Array<any>, data: string): boolean {
    let returnVal = true;

    if (!Validator.isAlphaNumeric(data)) {
      errors.push('alphaNumeric');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled=returnVal && isDisabled;
    return returnVal;

  }
  validateJoiningDate(errors: Array<any>,data: string): boolean {

    let returnVal = true;

    if (!Validator.isDate(data)) {
      errors.push('date');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled=returnVal && isDisabled;
    return returnVal;

  }
  validateLeavingDate(errors: Array<any>,data: string, date2: string): boolean {

    let returnVal = true;

    if (!Validator.isDate(data)) {
      errors.push('date');
      returnVal = false;
    }

    if (!Validator.compareDates(data,date2)){
      errors.push('notBeforeJoiningDate');
      returnVal = false;
    }

    isDisabled=returnVal && isDisabled;
    return returnVal;

  }
  validateTechnologies(errors: Array<any>,data: string): boolean {

    let returnVal = true;

    if (!Validator.isAscii(data)) {
      errors.push('date');
      returnVal = false;
    }

    isDisabled=returnVal && isDisabled;
    return returnVal;

  }

  setDisabled(){
    isDisabled=true;
  }

  validate(fieldName: String, errors: Array<any>,data: string, data2?:string): boolean {
     if (fieldName === 'name') return this.validateName(errors, data);
     if (fieldName === 'role') return this.validateAlpha(errors, data);
     if (fieldName === 'technologies') return this.validateTechnologies(errors, data);
     if (fieldName === 'joiningDate') return this.validateJoiningDate(errors, data);
     if (fieldName === 'leavingDate') return this.validateLeavingDate(errors, data,data2);
  }


}
