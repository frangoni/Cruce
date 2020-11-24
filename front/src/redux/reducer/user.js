import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  SET_ERROR_USER_BACK,
} from "../constants";

const initialState = {
  user: {},
  token: "",
  isLoadingRegister: false,
  statusRegister: "",
  errorBack: "",
  isLoadingLogin: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER:
      console.log('isLoadingRegister Reducer', state.isLoadingRegister)
      return {
        ...state,
        isLoadingRegister: action.isLoadingRegister,
        
        statusRegister: action.statusRegister,
      };
    
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        token: action.token,
        isLoadingLogin: action.isLoadingLogin
      };
    case USER_LOGOUT:
      return { ...state, user: {} };
    case SET_ERROR_USER_BACK:
      return { ...state, errorBack: action.payload };
    default:
      return state;
  }
};
