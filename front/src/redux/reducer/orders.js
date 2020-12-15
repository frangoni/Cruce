import {
  GET_ORDERS,
  GET_ORDER,
  GET_MY_ORDERS,
  ADD_ORDERS,
  FILTER_ORDERS,
  UPDATE_ORDER,
  UPDATE_SINGLE_ORDER,
  PICKED_UP,
} from "../constants";

const initialState = {
  orders: [],
  order: {},
  myOrders: {},
  message: "",
};

const updateOrder = (orders, newOrder) => {
  return orders.map((order) =>
    order.id === newOrder.orderId ? { ...order, state: newOrder.state } : order
  );
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_ORDERS:
      return { ...state, myOrders: action.payload };
    case GET_ORDERS:
      return { ...state, orders: action.orders };
    case GET_ORDER:
      return { ...state, order: action.order };
    case ADD_ORDERS:
      return { ...state, orders: [...state.orders, ...action.payload] };
    case FILTER_ORDERS:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case UPDATE_ORDER:
      return { ...state, orders: updateOrder(state.orders, action.payload) };
    case UPDATE_SINGLE_ORDER:
      return { ...state, order: { ...state.order, state: action.payload } };
    case PICKED_UP:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
