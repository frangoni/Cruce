import { GET_ALL_CADETES, GET_ALL_EMPRESAS, UPDATE_CADETE, UPDATE_EMPRESA } from "../constants";

const initialState = {
    cadetes: [],
    empresas: []
}

const updateUsers = (arr, payload) => {
    return arr.map(user => (user.id === payload.id) ? payload.data : user)
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CADETES:
            return { ...state, cadetes: action.payload };
        case GET_ALL_EMPRESAS:
            return { ...state, empresas: action.payload };
        case UPDATE_CADETE:
            return { ...state, cadetes: updateUsers(state.cadetes, action.payload) }
        case UPDATE_EMPRESA:
            return { ...state, empresas: updateUsers(state.empresas, action.payload) }
        default:
            return state;
    }
};