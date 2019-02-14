import { AWAITING_AUTH_RESPONSE } from "./constants";

const initialState = {
  auth: {
    status: AWAITING_AUTH_RESPONSE,
    username: null,
    icon: null,
    points: null
  },
  modal: null,
  flash: null
};

export default initialState;
