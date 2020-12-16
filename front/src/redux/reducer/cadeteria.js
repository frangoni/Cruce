import {
  GET_ALL_CADETERIAS,
  UPDATE_CADETERIA,
  GET_ACCEPTED_CADETERIAS,
} from "../constants";

const initialState = {
  allCadeterias: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCEPTED_CADETERIAS:
      return { ...state, acceptedCadeterias: action.payload };
    case GET_ALL_CADETERIAS:
      return { ...state, allCadeterias: action.payload };
    default:
      return state;
  }
};
