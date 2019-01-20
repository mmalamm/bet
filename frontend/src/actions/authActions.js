import axios from "axios";
import {
  SIGN_IN,
  SIGN_OUT,
  ATTEMPTING_LOGIN,
  ATTEMPTING_LOGOUT
} from "../constants";

export const signIn = user => {
  return {
    type: SIGN_IN,
    payload: user
  };
};
export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({ type: ATTEMPTING_LOGOUT });
    axios.post("/api/logout").then(_ => dispatch(signOut()));
  };
};

export const fetchCurrentUser = () => {
  return dispatch => {
    dispatch({ type: ATTEMPTING_LOGIN });
    axios
      .get("/api/current_user")
      .then(data => data.data)
      .then(({ user }) => {
        console.log(user);
        if (user) {
          dispatch(signIn(user));
        } else {
          dispatch(signOut());
        }
      });
  };
};

export const updateIcon = iconName => {
  return dispatch => {
    axios({
      method: "post",
      url: "/api/update_icon",
      data: {
        iconName
      }
    }).then(data => {
      console.log(data);
      dispatch({ type: "UPDATE_ICON", iconName });
    });
  };
};
