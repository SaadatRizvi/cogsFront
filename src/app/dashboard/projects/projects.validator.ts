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
    'alpha': 'Must contain alphabets only',
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
  validateLeavingDate(errors: Array<any>,data: string): boolean {

    let returnVal = true;

    if (!Validator.isDate(data)) {
      errors.push('date');
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

  validate(fieldName: String, errors: Array<any>,data: string): boolean {
     if (fieldName === 'name') return this.validateAlpha(errors, data);
     if (fieldName === 'role') return this.validateAlpha(errors, data);
     if (fieldName === 'technologies') return this.validateTechnologies(errors, data);
     if (fieldName === 'joiningDate') return this.validateJoiningDate(errors, data);
     if (fieldName === 'leavingDate') return this.validateLeavingDate(errors, data);
  }


}
