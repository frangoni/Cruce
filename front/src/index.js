import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from './redux/store'

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <Route path="/" component={Main} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
