import { GET_METRICAS } from "../constants";

const initialState = {
  metricas: {},
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_METRICAS:
      return { ...state, metricas: action.payload, orders: action.orders };

    default:
      return state;
  }
};
