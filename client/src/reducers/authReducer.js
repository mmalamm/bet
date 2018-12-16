import initialState from "../initial-state.js";

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case "ATTEMPTING_LOGIN":
      return {status: "AWAITING_AUTH_RESPONSE"};
    case "SIGN_OUT":
      return {status: "ANONYMOUS", email: null, displayName: null, photoURL: null, uid: null};
    case "SIGN_IN":
      return {
        status: "SIGNED_IN",
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
        uid: action.payload.uid,
        username: action.payload.username,
        points: action.payload.points
      };
    case "UPDATE_PHOTO_URL":
      return {
        ...state,
        photoURL: action.url
      }
    default:
      return state;
  }
}