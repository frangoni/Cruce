import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import { loadState, saveState } from "./localStorage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))//createLogger(), thunkMiddleware))
);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export default store;
