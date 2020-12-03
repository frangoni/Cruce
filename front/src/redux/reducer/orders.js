import {
  GET_ORDERS,
  GET_ORDER,
  GET_MY_ORDERS,
  ADD_ORDERS,
  FILTER_ORDERS
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
    case ADD_ORDERS: return { ...state, orders: [...state.orders, ...action.payload] }
    case FILTER_ORDERS: return { ...state, orders: state.orders.filter(order => order.id !== action.payload) }
    default: return state;
  }
};
