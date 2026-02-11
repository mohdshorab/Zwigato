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
