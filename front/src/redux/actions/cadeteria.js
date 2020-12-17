import { GET_ACCEPTED_CADETERIAS, GET_ALL_CADETERIAS, UPDATE_CADETERIA } from "../constants";
import axios from "axios";

export const getAceptedCadeterias = function (cadeterias) {
  return {
    type: GET_ACCEPTED_CADETERIAS,
    payload: cadeterias,
  };
};

export const fetchAcceptedCadeterias = () => (dispatch) => {
  axios.get("/api/cadeterias").then((cadeterias) => {
    return dispatch(getAceptedCadeterias(cadeterias.data));
  });
};

export const getAllCadeterias = function (cadeterias) {
  return {
    type: GET_ALL_CADETERIAS,
    payload: cadeterias,
  };
};

export const updateCadeteria = (id, data) => ({
  type: UPDATE_CADETERIA,
  payload: { id, data },
});

export const fetchCadeterias = () => (dispatch) => {
  axios.get("/api/cadeterias/all").then((cadeterias) => {
    return dispatch(getAllCadeterias(cadeterias.data));
  });
};

export const fetchAcceptCadeteriaById = (id) => (dispatch, state) => {
  const { token } = state().user;
  axios({
    method: "PUT",
    url: `/api/cadeterias/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    data: {},
  }).catch((e) => console.log(e));
};

export const deleteCadeteria = (data) => (dispatch) => {
  axios.post("/api/cadeterias/delete", data);
};

export const createCadeteria = (data) => {
  return axios.post("/api/cadeterias", data);
};
