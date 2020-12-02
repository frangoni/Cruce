import { GET_ORDERS, GET_ORDER, SINGLE_ORDER_UPDATE } from "../constants";

const initialState = {
  orders: [],
  order: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, orders: action.orders };
    case GET_ORDER:
      return { ...state, order: action.order };
/*     case SINGLE_ORDER_UPDATE:
      return {...state.order, order: action.estado} */
    default:
      return state;
  }
};
