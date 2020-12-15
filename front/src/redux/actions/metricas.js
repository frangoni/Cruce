import {GET_METRICAS} from '../constants'
import axios from 'axios'

export const getMetricas = function (metricas) {
    return {
      type: GET_METRICAS,
      payload: metricas,
    };
};

export const fetchMetricas = () => (dispatch, state) => {
  const token = state().user.token  
  axios(
    {
      method: "GET",
      url: "/api/metricas",
      headers: { Authorization: `Bearer ${token}` },
    }).then((metricas) => {
      return dispatch(getMetricas(metricas.data));
    });
};

