import {Validator} from "../../common/lib/validator";
import {NgForm} from "@angular/forms";
import {ViewChild} from "@angular/core";
export var formErrors = {
  cnic: null,
  personalEmail: null,
  mobileNumber: null,
  phoneNumber: null,
  skype: null,
  emergencyName: null,
  emergencyAddress: null,
  emergencyNumber: null,
  emergencyRelation: null
};

export const validationMessages = {
  'cnic': {
    'required': 'Required.',
    'number': 'Must only contain numbers'
  },
  'personalEmail': {
    'required': 'Required.',
    'email': 'Must be an email'
  },
  'mobileNumber': {
    'required': 'Required.',
    'number': 'Must only contain numbers'
  },
  'phoneNumber': {
    'number': 'Must only contain numbers'
  },
  'skype': {
    'ascii': 'Must only contain ascii characters'
  },
  'emergencyName': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only',
  },
  'emergencyNumber': {
    'required': 'Required.',
    'number': 'Must only contain numbers'
  },
  'emergencyAddress': {
    'required': 'Required.',
    'ascii': 'Must only contain ascii characters'
  },
  'emergencyRelation': {
    'required': 'Required.',
    'alpha': 'Must contain alphabets only',
  }
};

export var isDisabled: boolean =true  ;

export class ContactDetailsValidator {
  // formErrors = {
  //   personalEmail: null,
  //   mobileNumber: null,
  //   phoneNumber: null,
  //   skype: null,
  //   emergencyName: null,
  //   emergencyAddress: null,
  //   emergencyNumber: null,
  //   emergencyRelation: null
  // };
  //
  // validationMessages = {
  //   'personalEmail': {
  //     'required': 'Required.',
  //     'email': 'Must be an email'
  //   },
  //   'mobileNumber': {
  //     'required': 'Required.',
  //     'number': 'Must only contain numbers'
  //   },
  //   'phoneNumber': {
  //     'number': 'Must only contain numbers'
  //   },
  //   'skype': {
  //     'ascii': 'Must only contain ascii characters'
  //   },
  //   'emergencyName': {
  //     'required': 'Required.',
  //     'alpha': 'Must contain alphabets only',
  //   },
  //   'emergencyNumber': {
  //     'required': 'Required.',
  //     'number': 'Must only contain numbers'
  //   },
  //   'emergencyAddress': {
  //     'required': 'Required.',
  //     'ascii': 'Must only contain ascii characters'
  //   },
  //   'emergencyRelation': {
  //     'required': 'Required.',
  //     'alpha': 'Must contain alphabets only',
  //   }
  // };

  constructor(){
    isDisabled=true;
  }

  validateEmail(errors: Array<any>,email: string): boolean {
    let returnVal = true;

    if (!Validator.isEmail(email)) {
      errors.push('email');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(email)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled=returnVal && isDisabled;
    return returnVal;

  }

  validateMobileNumber(errors: Array<any>, number: string): boolean {
    let returnVal = true;

    if (!Validator.isNumber(number)) {
      errors.push('number');
      returnVal = false;
    }

    if (Validator.isNullOrUndefined(number)) {
      errors.push('required');
      returnVal = false;
    }
    isDisabled=returnVal && isDisabled;
    return returnVal;

  }

  validatePhoneNumber(errors: Array<any>, number: string): boolean {
    let returnVal = true;

    if (!Validator.isNumber(number)) {
      errors.push('number');
      returnVal = false;
    }
    isDisabled=returnVal && isDisabled;
    return returnVal;
  }
  validateSkype(errors: Array<any>, data: string): boolean {
    let returnVal = true;

    if (!Validator.isAscii(data)) {
      errors.push('ascii');
      returnVal = false;
    }
    isDisabled=returnVal && isDisabled;
    return returnVal;
  }
  validateEmergencyAlpha(errors: Array<any>, data: string): boolean {
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


  validateEmergencyAddress(errors: Array<any>,data: string): boolean {

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
     if (fieldName === 'cnic') return this.validateMobileNumber(errors, data);
    if (fieldName === 'personalEmail') return this.validateEmail(errors, data);
    if (fieldName === 'phoneNumber') return this.validatePhoneNumber(errors, data);
    if (fieldName === 'mobileNumber') return this.validateMobileNumber(errors, data);
    if (fieldName === 'skype') return this.validateSkype(errors, data);

    if (fieldName === 'emergencyName') return this.validateEmergencyAlpha(errors, data);
    if (fieldName === 'emergencyRelation') return this.validateEmergencyAlpha(errors,data);
    if (fieldName === 'emergencyNumber') return this.validateMobileNumber(errors, data);
    if (fieldName === 'emergencyAddress') return this.validateEmergencyAddress(errors, data);
  }


}
