import {Validator} from "../../common/lib/validator";
export var formErrors = {
  company: null,
  location: null,
  title: null,
  joiningDate: null,
  leavingDate: null
};

export const validationMessages = {
  'company': {
    'required': 'Required.',
    'alpha': 'Must be AlphaNumeric'
  },
  'location': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only'
  },
  'title': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only'
  },
  'joiningDate': {
    'required': 'Required.',
    'date': 'Must be a date in the following format: YYYY/MM/DD'
  },
  'leavingDate': {
    'required': 'Required.',
    'date': 'Must be a date in the following format: YYYY/MM/DD',
    'notBeforeJoiningDate': 'Leaving Date must be after Joining Date'

  }
};


export var isDisabled: boolean = true;

export class EmploymentsValidator {

  constructor() {
    isDisabled = true;
  }

  setDisabled() {
    isDisabled = true;
  }


  validate(fieldName: String, errors: Array<any>, data: string, date2?: string): boolean {
    if (fieldName === 'company') return this.validateCompany(errors, data);
    if (fieldName === 'location') return this.validateLocation(errors, data);
    if (fieldName === 'title') return this.validateTitle(errors, data);
    if (fieldName === 'joiningDate') return this.validateJoiningDate(errors, data);
    if (fieldName === 'leavingDate') return this.validateLeavingDate(errors, data, date2);

  }


  validateCompany(errors: Array<any>, data: string): boolean {
    let returnVal = true;

    if (!Validator.isAscii(data)) {
      errors.push('alpha');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled = returnVal && isDisabled;
    return returnVal;

  }

  validateTitle(errors: Array<any>, data: string): boolean {
    let returnVal = true;

    if (!Validator.isAscii(data)) {
      errors.push('alpha');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled = returnVal && isDisabled;
    return returnVal;

  }

  validateLocation(errors: Array<any>, data: string): boolean {
    let returnVal = true;

    if (!Validator.isAlpha(data)) {
      errors.push('alpha');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled = returnVal && isDisabled;
    return returnVal;

  }

  validateJoiningDate(errors: Array<any>, data: string): boolean {
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

  validateLeavingDate(errors: Array<any>, data: string, date2: string): boolean {

    let returnVal = true;

    if (!Validator.isDate(data)) {
      errors.push('date');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }
    if (!Validator.compareDates(data,date2)){
      errors.push('notBeforeJoiningDate');
      returnVal = false;
    }

    isDisabled=returnVal && isDisabled;
    return returnVal;

  }


}
