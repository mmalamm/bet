const createMap = arr =>
  arr.reduce((a, s) => {
    a[s] = s;
    return a;
  }, {});

const CONSTANTS = [
  ///// auth constants
  "AWAITING_AUTH_RESPONSE",
  "LOGGED_OUT",
  "LOGGED_IN",
  "ATTEMPTING_LOGIN",
  "ATTEMPTING_LOGOUT",
  "SIGN_IN",
  "SIGN_OUT",

  //// flash constants
  "AUTH_FAILURE_FLASH",
  "INVALID_USERNAME_FLASH",
  "USERNAME_TAKEN_FLASH",
  "GENERIC_ERROR_FLASH",
  "LOGGED_IN_FLASH",
  "SHORT_PASSWORD_FLASH"
];

const o = createMap(CONSTANTS);

export const {
  ////// auth constants
  AWAITING_AUTH_RESPONSE,
  LOGGED_OUT,
  LOGGED_IN,
  ATTEMPTING_LOGIN,
  ATTEMPTING_LOGOUT,
  SIGN_IN,
  SIGN_OUT,

  ///// flash constants
  AUTH_FAILURE_FLASH,
  INVALID_USERNAME_FLASH,
  USERNAME_TAKEN_FLASH,
  GENERIC_ERROR_FLASH,
  LOGGED_IN_FLASH,
  SHORT_PASSWORD_FLASH
} = o;
