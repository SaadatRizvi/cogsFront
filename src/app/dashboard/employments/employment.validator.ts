import {Validator} from "../../common/lib/validator";
export var formErrors = {
  company: null,
  location: null,
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
  'joiningDate': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only'
  },
  'leavingDate': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only',

  }
};


export var isDisabled: boolean = true;

export class AddressesValidator {

  constructor() {
    isDisabled = true;
  }

  setDisabled() {
    isDisabled = true;
  }


  validate(fieldName: String, errors: Array<any>, data: string): boolean {
    if (fieldName === 'company') return this.validateCompany(errors, data);
    if (fieldName === 'location') return this.validateLocation(errors, data);
    if (fieldName === 'joiningDate') return this.validateJoiningDate(errors, data);
    if (fieldName === 'leavingDate') return this.validateLeavingDate(errors, data);

  }


  validateCompany(errors: Array<any>, data: string): boolean {
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

    if (!Validator.isAlphaNumeric(data)) {
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

  validateLeavingDate(errors: Array<any>, data: string): boolean {

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


}
