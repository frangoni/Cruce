import { SET_MY_CADETERIAS, SET_ALL_CADETERIAS, SET_MY_TIENDAS, SET_MY_CADETERIAS_CADETE } from "../constants";
import axios from "axios";

const setMyCadeterias = function (cadeterias) {
  return {
    type: SET_MY_CADETERIAS,
    payload: cadeterias,
  };
};

const setMyCadeteriaCadete = function (cadeterias) {
  return {
    type: SET_MY_CADETERIAS_CADETE,
    payload: cadeterias,
  }
}

const setMyTiendas = function (tiendas) {
  return {
    type: SET_MY_TIENDAS,
    payload: tiendas,
  };
};

const setAllCadeterias = function (cadeterias) {
  return {
    type: SET_ALL_CADETERIAS,
    payload: cadeterias,
  };
};

//ASYNCHRONUS

export const fetchMyCadeterias = () => (dispatch, state) => {
  const token = state().user.token;

  axios
    .get(`/api/cadeterias/miscadetes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch(setMyCadeterias(res.data));
    });
};

export const fetchMyCadeteriaCadete = (id) => (dispatch, state) => {
  const token = state().user.token;

  axios
    .get(`/api/cadeterias/miscadetes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch(setMyCadeteriaCadete(res.data));
    });
};

export const fetchMyTiendas = () => (dispatch, state) => {
  const token = state().user.token;
  axios.get(`/api/cadeterias/mistiendas`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
    dispatch(setMyTiendas(res.data));
  });

};

export const fetchCadeterias = () => (dispatch) => {
  axios.get(`/api/cadeterias/`).then((res) => {
    dispatch(setAllCadeterias(res.data));
  });
};

export const postMyCadeterias = (cadeteriasIds) => (dispatch, state) => {
  const token = state().user.token;
  axios({
    method: "PUT",
    url: "/api/cadeterias/",
    headers: { Authorization: `Bearer ${token}` },
    data: { cadeteriasIds },
  }).then((res) => dispatch(fetchCadeterias()));
};
