
import initialState from "../initial-state.js";

export default function modalReducer(state = initialState.modal, action) {
  switch (action.type) {
    case "SHOW_NEW_GAME_FORM":
      return "NEW_GAME_FORM";
    case "SHOW_CHANGE_PIC_FORM":
      return "CHANGE_PIC_FORM";
    case "HIDE_MODAL":
      return null;
    default:
      return state;
  }
}