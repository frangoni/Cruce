import {
  GET_ORDERS,
  GET_MY_ORDERS
} from "../constants";

const initialState = {
  orders: [],
  myOrders: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS: return { ...state, orders: action.payload }
    case GET_MY_ORDERS: return { ...state, myOrders: action.payload }
    default: return state
  }
};
