

export const updateCurrentUsers = users => {
  return dispatch => {
    dispatch({ type: "currentUsers", payload: users });
  };
};


