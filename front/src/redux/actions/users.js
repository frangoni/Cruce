import { GET_ALL_CADETES, GET_ALL_EMPRESAS, UPDATE_CADETE, UPDATE_EMPRESA } from "../constants";
import { setError } from "../actions/user";
import axios from "axios";

/* export const userRegister = () => {
    return {
        type: USER_REGISTER
    };
}; 
 */
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

const updateCadete = (id, data) => ({
  type: UPDATE_CADETE,
  payload: { id, data },
});

const updateEmpresa = (id, data) => ({
  type: UPDATE_EMPRESA,
  payload: { id, data },
});

export const fetchCadetes = (data) => (dispatch, state) => {
  const { token } = state().user;
  axios
    .get("/api/users/cadetes", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((cadetes) => {
      dispatch(setCadetes(cadetes.data));
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};

export const fetchEmpresas = (data) => (dispatch, state) => {
  const { token } = state().user;
  axios
    .get("/api/users/empresas", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((empresas) => {
      dispatch(setEmpresas(empresas.data));
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};

export const fetchAcceptUserById = (id, role) => (dispatch, state) => {
  const { token } = state().user;

  axios({
    method: "PUT",
    url: `/api/users/${role.toLowerCase()}s/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    data: {},
  })
    .then((res) => {
      if (role.toLowerCase() === "empresa") dispatch(updateEmpresa(id, res.data));
      else dispatch(updateCadete(id, res.data));
    })
    .catch((err) => {
      dispatch(setError(err));
    });
};

export const deleteUser = (data) => (dispatch) => {
  axios.post("/api/users/delete", data).catch((err) => {
    dispatch(setError(err));
  });
};
