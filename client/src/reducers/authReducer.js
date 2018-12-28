import initialState from "../initial-state.js";

import { AWAITING_AUTH_RESPONSE, LOGGED_OUT, LOGGED_IN } from "../constants";

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case "ATTEMPTING_LOGIN":
      return { status: AWAITING_AUTH_RESPONSE };
    case "SIGN_OUT":
      return {
        status: LOGGED_OUT,
        username: null,
        imgUrl: null,
        points: null
      };
    case "SIGN_IN":
      return {
        status: LOGGED_IN,
        username: action.payload.username,
        imgUrl: action.payload.imgUrl,
        points: action.payload.points
      };
    default:
      return state;
  }
}
