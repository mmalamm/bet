import initialState from "../initial-state.js";

import {
  AWAITING_AUTH_RESPONSE,
  LOGGED_OUT,
  LOGGED_IN,
  UPDATE_ICON,
  ATTEMPTING_LOGIN,
  ATTEMPTING_LOGOUT,
  SIGN_OUT,
  SIGN_IN
} from "../constants";

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case UPDATE_ICON:
      return { ...state, icon: action.iconName };
    case ATTEMPTING_LOGIN:
      return { status: AWAITING_AUTH_RESPONSE };
    case ATTEMPTING_LOGOUT:
      return {
        status: AWAITING_AUTH_RESPONSE,
        username: null,
        icon: null,
        points: null
      };
    case SIGN_OUT:
      return {
        status: LOGGED_OUT,
        username: null,
        icon: null,
        points: null
      };
    case SIGN_IN:
      return {
        status: LOGGED_IN,
        username: action.payload.username,
        icon: action.payload.icon,
        points: action.payload.points
      };
    default:
      return state;
  }
}
