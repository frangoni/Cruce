import { GET_ALL_CADETES, GET_ALL_EMPRESAS } from "../constants";

const initialState = {
    cadetes: [],
    empresas: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CADETES:
            return { ...state, cadetes: action.payload };
        case GET_ALL_EMPRESAS:
            return { ...state, empresas: action.payload };
        default:
            return state;
    }
};