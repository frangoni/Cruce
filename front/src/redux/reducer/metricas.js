import { GET_METRICAS, GET_USER_METRICAS } from "../constants";

const initialState = {
  metricas: {},
  orders: [],
  userMetricas: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_METRICAS:
      return { ...state, metricas: action.payload, orders: action.orders };
    case GET_USER_METRICAS:
      return { ...state, userMetricas: action.payload };

    default:
      return state;
  }
};
