import { GET_ACCEPTED_CADETERIAS, GET_ALL_CADETERIAS } from "../constants";

const initialState = {
  acceptedCadeterias: [],
  cadeterias: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCEPTED_CADETERIAS:
      return { ...state, acceptedCadeterias: action.payload };
    case GET_ALL_CADETERIAS:
      return {...state, cadeterias: action.payload}

    default:
      return state;
  }
};
