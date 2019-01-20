import initialState from "../initial-state.js";

export default function modalReducer(state = initialState.flash, action) {
  switch (action.type) {
    case "SHOW_AUTH_FAILURE_FLASH":
      return "AUTH_FAILURE_FLASH";
    case "SHOW_INVALID_USERNAME_FLASH":
      return "INVALID_USERNAME_FLASH";
    case "SHOW_USERNAME_TAKEN_FLASH":
      return "USERNAME_TAKEN_FLASH";
    case "SHOW_GENERIC_ERROR":
      return "GENERIC_ERROR_FLASH";
    case "HIDE_FLASH":
      return null;
    default:
      return state;
  }
}
