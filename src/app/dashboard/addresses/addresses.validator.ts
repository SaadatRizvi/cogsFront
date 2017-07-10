import {Validator} from "../../common/lib/validator";
export var formErrors = {
  street: null,
  city: null,
  country: null,
  type: null
};

export const validationMessages = {
  'street': {
    'required': 'Required.',
    'alpha': 'Must be AlphaNumeric'
  },
  'city': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only'
  },
  'country': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only'
  },
  'type': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only',
    'duplicateType': 'A Type(Temp or Permanent) can contain only 1 address'

  }
};


export let isDisabled: boolean = true;

export class AddressesValidator {

  constructor() {
    isDisabled = true;
  }

  setDisabled() {
    isDisabled = true;
  }


  validate(fieldName: String, errors: Array<any>, data: string, length?: number, type?: string[], isEditEnabled?: boolean): boolean {
    if (fieldName === 'city') return this.validateCity(errors, data);

    if (fieldName === 'street') return this.validateStreet(errors, data);
    if (fieldName === 'type') return this.validateType(errors, data, length, type, isEditEnabled);
    if (fieldName === 'country') return this.validateCountry(errors, data);

  }


  validateCity(errors: Array<any>, data: string): boolean {
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

  validateCountry(errors: Array<any>, data: string): boolean {
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

  validateStreet(errors: Array<any>, data: string): boolean {
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

  validateType(errors: Array<any>, data: string, length: number, type: string[], isEditEnabled?: boolean): boolean {

    let returnVal = true;

    if (!Validator.isAlpha(data)) {
      errors.push('alpha');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(data)) {
      errors.push('required');
      returnVal = false;
    }

    if(isEditEnabled){


    }
    else{
      for (let i = 0; i < length; i++) {
        if (type[i] === data) {
          errors.push('duplicateType');
          returnVal = false;
        }

      }
    }
    isDisabled = returnVal && isDisabled;
    return returnVal;

  }


}
