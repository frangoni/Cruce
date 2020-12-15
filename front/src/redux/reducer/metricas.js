import {GET_METRICAS} from "../constants";

const initialState = {
  metricas: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_METRICAS:
      return { ...state, metricas: action.payload };

    default:
      return state;
  }
};