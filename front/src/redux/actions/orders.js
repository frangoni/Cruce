import { GET_MY_ORDERS, GET_ORDERS, GET_ORDER } from "../constants";
import axios from 'axios'

export const postOrders = (ordenes) => {
  return axios.post("/api/order/excel", ordenes).then((order) => console.log(order));
}

const getOrders = function (orders) {
  return {
    type: GET_ORDERS,
    orders,
  };
};

const getMyOrders = function (orders) {
  return {
    type: GET_MY_ORDERS,
    payload: orders
  }
}
export const fetchMyOrders = (page) => (dispatch, state) => {
  const token = state().user.token
  axios.get(`/api/order/myorders/${page}`,
    { headers: { Authorization: `Bearer ${token}` } }).then(res => {
      dispatch(getMyOrders(res.data))
    })
}

export const fetchOrders = () => dispatch => {
  axios.get("/api/order/excel").then(orders => dispatch(getOrders(orders)))
}


const getSingleOrder = function (order) {
  return {
    type: GET_ORDER,
    order,
  };
};

export const fetchSingleOrder = (id) => (dispatch) => {
  axios.get(`/api/order/${id}`).then((order) => {
    let parsedOrder = {
      ...order.data,
      products: JSON.parse(order.data.products),
      client: JSON.parse(order.data.client),
      destination: JSON.parse(order.data.destination),
    };
    return dispatch(getSingleOrder(parsedOrder));
  });
};

export const orderStateUpdate = (estado, id) => (dispatch) => {

  axios.put(`/api/order/${id}`, { state: estado })
    .then((order) => {
      let parsedOrder = {
        ...order.data,
        products: JSON.parse(order.data.products),
        client: JSON.parse(order.data.client),
        destination: JSON.parse(order.data.destination),
      };
      return dispatch(getSingleOrder(parsedOrder))
    })
}


