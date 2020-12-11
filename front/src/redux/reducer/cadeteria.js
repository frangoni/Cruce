import { GET_ALL_CADETERIAS } from "../constants";

const initialState = {
  cadeterias: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CADETERIAS:
      return { ...state, cadeterias: action.payload };

    default:
      return state;
  }
};
