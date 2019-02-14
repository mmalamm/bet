import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import flashReducer from "./flashReducer";

const reducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  flash: flashReducer,
});

export default reducer;
