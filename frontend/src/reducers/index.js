import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import flashReducer from "./flashReducer";
import usersReducer from "./usersReducer";

const reducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  flash: flashReducer,
  users: usersReducer
});

export default reducer;
