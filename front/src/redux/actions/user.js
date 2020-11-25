import {
  USER_REGISTER_ANIMATION,
  USER_LOGIN,
  USER_LOGIN_ANIMATION,
  USER_LOGOUT,
  SET_ERROR_USER_BACK,
} from "../constants";
import axios from "axios";

export const userRegisterAnimation = (valueLoading, valueStatus) => {
  return {
    type: USER_REGISTER_ANIMATION,
    isLoadingRegister: valueLoading,
    statusRegister: valueStatus,
  };
};

export const userLoginAnimation = (valueLogin, valueStatus) => {
  return {
    type: USER_LOGIN_ANIMATION,
    isLoadingLogin: valueLogin,
    statusLogin: valueStatus,
  };
};

export const userLogin = (user, token) => {
  return {
    type: USER_LOGIN,
    payload: user,
    token: token,
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
  dispatch(userRegisterAnimation(true, null));
  console.log("data", data);
  axios
    .post("/api/user/register", data)
    .then((res) => {
      console.log("res status", res.status);
      dispatch(userRegisterAnimation(false, res.status));
    })
    .catch((err) => {
      dispatch(userRegisterAnimation(false, 400));
      dispatch(setError(err));
    });
};

export const fetchLogin = (data) => (dispatch) => {
  dispatch(userLoginAnimation(true, null));
  axios
    .post("/api/user/login", data)
    .then((res) => {
      dispatch(userLogin(data.email, res.data));
      dispatch(userLoginAnimation(false, res.status));
    })
    .catch((err) => {
      dispatch(userLoginAnimation(false, 403));
      dispatch(setError(err));
    });
};
