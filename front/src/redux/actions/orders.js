import axios from 'axios'

export const postOrders = (ordenes) => {
   return  axios.post("/api/order/excel", ordenes).then((order) => console.log(order));
}

const  getOrders = function(orders){
    return {
        type : GET_ORDERS, 
        orders
    }
}

export const fetchOrders = ()=> dispatch => {
     axios.get("/api/order/excel").then(orders =>dispatch(getOrders(orders)))
}