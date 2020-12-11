import { GET_ALL_CADETERIAS } from '../constants'
import axios from 'axios'

export const getAllCadeterias = function (cadeterias) {
    return {
      type: GET_ALL_CADETERIAS,
      payload: cadeterias,
    };
};
  

export const fetchCadeterias = () => (dispatch) => {
    axios.get("/api/cadeterias").then((cadeterias) => {
      return dispatch(getAllCadeterias(cadeterias));
    });
};