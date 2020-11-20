import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  SET_ERROR,
} from "../constants";
import axios from "axios";

export const userRegister = () => {
  return {
    type: USER_REGISTER,
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
    type: SET_ERROR,
    payload: error,
  };
};

export const fetchRegister = (data) => (dispatch) => {
  dispatch(userRegister());
  axios.post("/api/user/register", data);
  then(() => {
    dispatch(userRegister(false));
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const fetchLogin = (data) => (dispatch) => {
  axios
    .post("/api/user/login", data)
    .then((res) => {
      if (res.data.error) {
        return alert(res.data.error);
      } else {
        dispatch(userLogin(data, res.data));
        //guardar token en localstorage?
      }
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};
