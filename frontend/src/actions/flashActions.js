export const hideFlash = () => dispatch => {
  dispatch({ type: "HIDE_FLASH" });
};

const flashMapper = {
  authFailure: "SHOW_AUTH_FAILURE_FLASH",
  invalidUsername: "SHOW_INVALID_USERNAME_FLASH",
  usernameTaken: "SHOW_USERNAME_TAKEN_FLASH"
};

export const showFlash = flashId => {
  const flashType = flashMapper[flashId] || "SHOW_GENERIC_ERROR";
  return dispatch => {
    dispatch({
      type: flashType
    });
  };
};
