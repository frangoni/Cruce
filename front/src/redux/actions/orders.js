import { GET_MY_ORDERS, GET_ORDERS } from "../constants";
import axios from 'axios'

export const postOrders = (ordenes) => {
    return axios.post("/api/order/excel", ordenes).then((order) => console.log(order));
}

const getOrders = function (orders) {
    return {
        type: GET_ORDERS,
        payload: orders
    }
}

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