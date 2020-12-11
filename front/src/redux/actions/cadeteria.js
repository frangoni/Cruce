import { GET_ACCEPTED_CADETERIAS, GET_ALL_CADETERIAS } from '../constants'
import axios from 'axios'

export const getAceptedCadeterias = function (cadeterias) {
    return {
      type: GET_ACCEPTED_CADETERIAS,
      payload: cadeterias,
    };
};
  

export const fetchAcceptedCadeterias = () => (dispatch) => {
    axios.get("/api/cadeterias").then((cadeterias) => {
      return dispatch(getAceptedCadeterias(cadeterias));
    });
};

export const getAllCadeterias = function (cadeterias) {
  return {
    type: GET_ALL_CADETERIAS,
    payload: cadeterias
  }
}

export const fetchCadeterias = () => (dispatch) => {
  axios.get("/api/cadeterias/all").then((cadeterias) => {
    return dispatch(getAllCadeterias(cadeterias));
  });
};



export const createCadeteria = (data) => {
  return axios.post("/api/cadeterias", data).then((data) => console.log(data));
}