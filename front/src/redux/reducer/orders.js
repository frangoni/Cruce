import {
  GET_ORDERS,
  GET_ORDER,
  GET_MY_ORDERS,
} from "../constants";

const initialState = {
  orders: [],
  order: {},
  myOrders: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_ORDERS: return { ...state, myOrders: action.payload }
    case GET_ORDERS: return { ...state, orders: action.orders };
    case GET_ORDER: return { ...state, order: action.order };
    default: return state;
  }
};
