import { USER_REGISTER_ANIMATION, USER_LOGIN_ANIMATION } from "../constants";

const initialState = {
  isLoadingRegister: false,
  statusRegister: "",
  isLoadingLogin: "",
  statusLogin: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_ANIMATION:
      return {
        ...state,
        isLoadingRegister: action.isLoadingRegister,
        statusRegister: action.statusRegister,
      };
    case USER_LOGIN_ANIMATION:
      return {
        ...state,
        isLoadingLogin: action.isLoadingLogin,
        statusLogin: action.statusLogin,
      };
    default:
      return state;
  }
};
