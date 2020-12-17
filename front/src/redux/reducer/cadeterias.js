import {
  SET_MY_CADETERIAS,
  SET_ALL_CADETERIAS,
  ADD_MY_CADETERIA,
  SET_MY_TIENDAS,
  SET_MY_CADETERIAS_CADETE,
  GET_ALL_CADETERIAS,
  GET_ACCEPTED_CADETERIAS,
} from "../constants";

const initialState = {
  cadeterias: [],
  misCadeterias: [],
  misCadeteriasCadete: [],
  tiendas: [],
  allCadeterias: [],
  acceptedCadeterias: [],
};

const filterIds = (payload) => {
  return payload.map((cadeteria) => cadeteria.id);
};

const createOrDestroy = (arr, payload) => {
  const indexOf = arr.indexOf(payload);
  if (indexOf > -1) return arr.filter((id) => id !== payload);
  return [...arr, payload];
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_CADETERIAS:
      return { ...state, cadeterias: action.payload };
    case SET_MY_CADETERIAS:
      return { ...state, misCadeterias: filterIds(action.payload) };
    case SET_MY_CADETERIAS_CADETE:
      return { ...state, misCadeteriasCadete: action.payload };
    case ADD_MY_CADETERIA:
      return {
        ...state,
        misCadeterias: createOrDestroy(state.misCadeterias, action.payload),
      };
    case SET_MY_TIENDAS:
      return { ...state, tiendas: action.payload };
    case GET_ACCEPTED_CADETERIAS:
      return { ...state, acceptedCadeterias: action.payload };
    case GET_ALL_CADETERIAS:
      return { ...state, allCadeterias: action.payload };
    default:
      return state;
  }
};
