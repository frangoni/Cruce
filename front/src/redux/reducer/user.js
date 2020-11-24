import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  SET_ERROR_REGISTER_BACK,
} from "../constants";

const initialState = {
  user: {},
  token: "",
  isLoadingRegister: "",
  statusRegister: "",
  errorRegisterBack: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        isLoadingRegister: action.isLoadingRegister,
        statusRegister: action.statusRegister,
      };
    case USER_LOGIN:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        token: action.token,
      };
    case USER_LOGOUT:
      return { ...state, user: {} };
    case SET_ERROR_REGISTER_BACK:
      return { ...state, errorRegisterBack: action.payload };
    default:
      return state;
  }
};
