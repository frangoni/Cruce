import { SET_MY_CADETERIAS, SET_ALL_CADETERIAS } from "../constants";
import axios from 'axios'



const setMyCadeterias = function (cadeterias) {
    return {
        type: SET_MY_CADETERIAS,
        payload: cadeterias
    }
}

const setAllCadeterias = function (cadeterias) {
    return {
        type: SET_ALL_CADETERIAS,
        payload: cadeterias
    }
}

//ASYNCHRONUS 

export const fetchMyCadeterias = () => (dispatch, state) => {
    const token = state().user.token
    axios.get(`/api/cadeterias/miscadetes`,
        { headers: { Authorization: `Bearer ${token}` } }).then(res => {
            dispatch(setMyCadeterias(res.data))
        })
}

export const fetchCadeterias = () => (dispatch) => {
    axios.get(`/api/cadeterias/`).then(res => {
        dispatch(setAllCadeterias(res.data));
    });
};


export const postMyCadeterias = (cadeteriasIds) => (dispatch, state) => {
    const token = state().user.token
    axios
        ({
            method: 'PUT',
            url: "/api/cadeterias/",
            headers: { Authorization: `Bearer ${token}` },
            data: { cadeteriasIds }
        }).then(res => dispatch(fetchCadeterias()))
}

