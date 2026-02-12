import { getCode } from './helpers';

export const getFirebaseAuthErrorMessage = (errorCode: string): string => {
  const code = getCode(errorCode);
  console.log('code', code);
  switch (code) {
    case 'auth/invalid-phone-number':
      return 'Invalid phone number format';
    case 'auth/missing-phone-number':
      return 'Please enter phone number';
    case 'auth/quota-exceeded':
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later';
    case 'auth/network-request-failed':
      return 'No internet connection';
    case 'auth/captcha-check-failed':
      return 'Verification failed. Please try again';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code';
    case 'auth/code-expired':
      return 'Code expired. Request a new one';
    case 'auth/session-expired':
      return 'Session expired. Please try again';
    default:
      return 'Something went wrong. Please try again';
  }
};
