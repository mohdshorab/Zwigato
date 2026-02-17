export const REGEX = {
  OTP: /^\d{0,6}$/,
  OTP_COMPLETE: /^\d{6}$/,
  PHONE_INPUT: /^[6-9][\d]{0,9}$/,
  PHONE_COMPLETE: /^[6-9]\d{9}$/,
  EMAIL_INPUT: /^[a-zA-Z0-9._%+\-@]*$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};
