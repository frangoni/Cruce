import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  SET_ERROR_USER_BACK,
} from "../constants";
import axios from "axios";

export const userRegister = (valueLoading, valueStatus) => {
  return {
    type: USER_REGISTER,
    isLoadingRegister: valueLoading,
    statusRegister: valueStatus,
  };
};

export const userLogin = (user, token, valueLoading) => {
  return {
    type: USER_LOGIN,
    payload: user,
    token: token,
    isLoadingLogin: valueLoading
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const setError = (error) => {
  return {
    type: SET_ERROR_USER_BACK,
    payload: error,
  };
};

export const fetchRegister = (data) => (dispatch) => {
  /* dispatch(userRegister(true, null)); */
  /* axios
    .post("/api/user/register", data)
    .then((res) => {
      console.log('res status', res.status)
      dispatch(userRegister(false, res.status));
    })
    .catch((err) => {
      dispatch(userRegister(false, 400));
      dispatch(setError(err));
    }); */
};


export const fetchLogin = (data) => (dispatch) => {
  dispatch(userLogin('','', true))
  axios
    .post("/api/user/login", data)
    .then((res) => {
      dispatch(userLogin(data, res.data, false));
      
        //guardar token en localstorage?
    })
    .catch((err) => {
      dispatch(userLogin('','', false))
      dispatch(setError(err));
    });
};
