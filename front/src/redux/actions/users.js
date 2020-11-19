import { GET_ALL_CADETES, GET_ALL_EMPRESAS } from "../constants";
import axios from 'axios'

export const userRegister = () => {
    return {
        type: USER_REGISTER
    };
};

export const setCadetes = (cadetes) => {
    return {
        type: GET_ALL_CADETES,
        payload: cadetes,
    };
};

export const setEmpresas = (empresas) => {
    return {
        type: GET_ALL_EMPRESAS,
        payload: empresas,
    };
};


export const fetchCadetes = (data) => (dispatch, state) => {
    const { token } = state().user
    axios
        .get('/api/users/cadetes', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((cadetes) => {
            dispatch(setCadetes(cadetes.data))
        })
        .catch((err) => {
            console.log('ERROR DEL FETCH REGISTER', err)
            dispatch(setError(err))
        })
}

export const fetchEmpresas = (data) => (dispatch, state) => {
    const { token } = state().user
    axios
        .get('/api/users/empresas', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((empresas) => {
            dispatch(setEmpresas(empresas.data))
        })
        .catch((err) => {
            console.log('ERROR DEL FETCH REGISTER', err)
            dispatch(setError(err))
        })
}