import { USER_LOGIN, USER_LOGOUT, SET_ERROR_USER_BACK } from "../constants";

const initialState = {
  user: {},
  token: "",
  errorBack: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        token: action.token,
      };
    case USER_LOGOUT:
      localStorage.clear();
      return { ...state, user: {}, token: "" };
    case SET_ERROR_USER_BACK:
      return { ...state, errorBack: action.payload };
    default:
      return state;
  }
};
