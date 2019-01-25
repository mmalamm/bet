import initialState from '../initial-state';

const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case "currentUsers":
      console.log("users reduser cog hit",action)
      return action.payload;
  
    default:
      return state;
  }
}

export default usersReducer;