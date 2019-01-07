const createMap = arr =>
  arr.reduce((a, s) => {
    a[s] = s;
    return a;
  }, {});

const CONSTANTS = [
  "AWAITING_AUTH_RESPONSE",
  "LOGGED_OUT",
  "LOGGED_IN",
  "ATTEMPTING_LOGIN",
  "ATTEMPTING_LOGOUT",
  "SIGN_IN",
  "SIGN_OUT"
];

const o = createMap(CONSTANTS);

export const {
  AWAITING_AUTH_RESPONSE,
  LOGGED_OUT,
  LOGGED_IN,
  ATTEMPTING_LOGIN,
  ATTEMPTING_LOGOUT,
  SIGN_IN,
  SIGN_OUT
} = o;
