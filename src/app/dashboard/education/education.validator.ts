import {Validator} from "../../common/lib/validator";
import {NgForm} from "@angular/forms";
import {ViewChild} from "@angular/core";
export var formErrors = {
  institute: null,
  passingDate: null,
  degree: null,
  field: null,
  gpa: null,
};

export const validationMessages = {
  'institute': {
    'required': 'Required.',
    'ascii': 'Must contain ascii only',
  },
  'field': {
    'required': 'Required.',
    'ascii': 'Must contain ascii only',
  },
  'degree': {
    'required': 'Required.',
    'ascii': 'Must contain ascii only',
  },
  'gpa': {
    'required': 'Required.',
    'number': 'Must be in correct format \'D:DDDD\' e.g 3.0443 ',
  },
  'passingDate': {
    'required': 'Required.',
    'date': 'Must be a date in the following format: YYYY/MM/DD',
  }
};

export var isDisabled: boolean =true  ;

export class EducationValidator {


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


  validateGpa(errors: Array<any>,data: string): boolean {

    let returnVal = true;

    if (!Validator.isFloat(data)) {
      errors.push('number');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled=returnVal && isDisabled;
    return returnVal;

  }
  validateDate(errors: Array<any>,data: string): boolean {

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
  validateAscii(errors: Array<any>,data: string): boolean {

    let returnVal = true;

    if (!Validator.isAscii(data)) {
      errors.push('ascii');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled=returnVal && isDisabled;
    return returnVal;

  }

  setDisabled(){
    isDisabled=true;
  }

  validate(fieldName: String, errors: Array<any>,data: string): boolean {
     if (fieldName === 'gpa') return this.validateGpa(errors, data);
     if (fieldName === 'passingDate') return this.validateDate(errors, data);
     if (fieldName === 'field') return this.validateAscii(errors, data);
     if (fieldName === 'institute') return this.validateAscii(errors, data);
     if (fieldName === 'degree') return this.validateAscii(errors, data);

    else return this.validateAlpha(errors, data);
  }


}
