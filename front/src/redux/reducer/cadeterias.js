import {
  SET_MY_CADETERIAS_CADETE,
  SET_MY_CADETERIAS,
  SET_ALL_CADETERIAS,
  ADD_MY_CADETERIA,
} from "../constants";

const initialState = {
  cadeterias: [],
  misCadeterias: [],
  misCadeteriasCadete: [],
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
    default:
      return state;
  }
};
