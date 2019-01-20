export const hideFlash = () => dispatch => {
  dispatch({ type: "HIDE_FLASH" });
};

export const showFlash = flashId => {
  return dispatch => {
    dispatch({
      type: flashId
    });
  };
};

export const loggedInFlash = () => {
  return dispatch => {
    dispatch({
      type: "loggedIn"
    });
  };
};
