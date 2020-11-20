import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  SET_ERROR,
} from "../constants";

const initialState = {
  user: {},
  token: "",
  register: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return { ...state, register: true };
    case USER_LOGIN:
      return { ...state, register: false, user: action.payload };
    case USER_LOGOUT:
      return { ...state, user: {} };
    default:
      return state;
  }
};
