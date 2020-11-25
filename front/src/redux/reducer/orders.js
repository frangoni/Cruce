import {
    GET_ORDERS
  } from "../constants";
  
  const initialState = {
      orders:[]
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS : 
        return {...state,orders : action.orders}
    }
  };
  