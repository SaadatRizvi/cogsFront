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
    'alpha': 'Must contain alphabets only',
  },
  'field': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only',
  },
  'degree': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only',
  },
  'gpa': {
    'required': 'Required.',
    'number': 'Must contain number only',
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

  setDisabled(){
    isDisabled=true;
  }

  validate(fieldName: String, errors: Array<any>,data: string): boolean {
     if (fieldName === 'gpa') return this.validateGpa(errors, data);
     else return this.validateAlpha(errors, data);
  }


}
