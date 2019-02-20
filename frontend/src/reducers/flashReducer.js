import initialState from "../initial-state.js";
import {
  AUTH_FAILURE_FLASH,
  INVALID_USERNAME_FLASH,
  USERNAME_TAKEN_FLASH,
  GENERIC_ERROR_FLASH,
  LOGGED_IN_FLASH,
  SHORT_PASSWORD_FLASH,
  HIDE_FLASH
} from "../constants";

const flashMapper = {
  authFailure: AUTH_FAILURE_FLASH,
  invalidUsername: INVALID_USERNAME_FLASH,
  usernameTaken: USERNAME_TAKEN_FLASH,
  genericError: GENERIC_ERROR_FLASH,
  loggedIn: LOGGED_IN_FLASH,
  passwordTooShort: SHORT_PASSWORD_FLASH
};

const flashReducer = (state = initialState.flash, action) => {
  if (action.type === HIDE_FLASH) return null;
  return flashMapper[action.type] || state;
};

export default flashReducer;
