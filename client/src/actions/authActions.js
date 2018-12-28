import Axios from "axios";

export const signIn = user => {
  return {
    type: "SIGN_IN",
    payload: user
  };
};
export const signOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({ type: "ATTEMPTING_LOGOUT" });
    Axios.post("/api/logout").then(_ => dispatch(signOut()));
  };
};
