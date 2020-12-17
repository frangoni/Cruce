import { GET_METRICAS, GET_USER_METRICAS } from "../constants";
import axios from "axios";

export const getMetricas = function (metricas, orders) {
  return {
    type: GET_METRICAS,
    payload: metricas,
    orders,
  };
};

export const getUserMetricas = function (user) {
  return {
    type: GET_USER_METRICAS,
    payload: user,
  };
};

export const fetchMetricas = () => (dispatch, state) => {
  const token = state().user.token;
  axios({
    method: "GET",
    url: "/api/metricas",
    headers: { Authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    const { metricas, orders } = data;
    return dispatch(getMetricas(metricas, orders));
  });
};

export const fetchUserMetricas = (id) => (dispatch) => {
  axios.get(`/api/metricas/${id}`).then(({ data }) => {
    console.log("DATA", data);
    return dispatch(getUserMetricas(data));
  });
};
