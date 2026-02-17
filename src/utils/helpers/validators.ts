import { REGEX } from '../constants/regex';

export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

export const validateOTPInput = (otp: string): ValidationResult => {
  if (otp === '') {
    return { isValid: true };
  }
  if (!REGEX.OTP.test(otp)) {
    return {
      isValid: false,
      error: 'OTP must contain only numbers',
    };
  }
  return { isValid: true };
};

export const validateOTPComplete = (otp: string): ValidationResult => {
  if (otp === '') {
    return {
      isValid: false,
      error: 'Please enter OTP',
    };
  }
  if (!REGEX.OTP_COMPLETE.test(otp)) {
    return {
      isValid: false,
      error: 'OTP must contain only numbers',
    };
  }

  return { isValid: true };
};

export const validatePhoneInput = (phone: string): ValidationResult => {
  if (phone === '') {
    return { isValid: true };
  }
  if (!REGEX.PHONE_INPUT.test(phone)) {
    return {
      isValid: false,
      error: 'Phone number must contain only numbers',
    };
  }
  return { isValid: true };
};

export const validatePhoneComplete = (phone: string): ValidationResult => {
  if (phone === '') {
    return {
      isValid: false,
      error: 'Please enter phone',
    };
  }
  if (!REGEX.PHONE_COMPLETE.test(phone)) {
    return {
      isValid: false,
      error: 'phone must contain 10 digits',
    };
  }

  return { isValid: true };
};

export const validateEmailInput = (email: string): ValidationResult => {
  if (email === '') {
    return { isValid: true };
  }

  if (!REGEX.EMAIL_INPUT.test(email)) {
    return {
      isValid: false,
      error: `Email can't have invalid characters`,
    };
  }
  return { isValid: true };
};

export const validateEmailComplete = (email: string): ValidationResult => {
  if (email === '') {
    return {
      isValid: false,
      error: 'Please enter email address',
    };
  }
  if (!REGEX.EMAIL.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }

  return { isValid: true };
};
