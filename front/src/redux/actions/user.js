import { USER_REGISTER, USER_LOGIN, USER_LOGOUT, SET_TOKEN, SET_ERROR } from "../constants";
import axios from 'axios'

export const userRegister = () => {
  return {
    type: USER_REGISTER
  };
};

export const userLogin = (user) => {
  return {
    type: USER_LOGIN,
    payload: user,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  };
};

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error
  }
}

const setToken = token => ({
  type: SET_TOKEN,
  payload: token
})

export const fetchRegister = (data) => (dispatch) => {
  axios
    .post('/api/user/register', data)
    .then((res) => {
      dispatch(userRegister())
      console.log('RES DEL POST', res)
    })
    .catch((err) => {
      console.log('ERROR DEL FETCH REGISTER', err)
      dispatch(setError(err))
    })
}
