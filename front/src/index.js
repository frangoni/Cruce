import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <Route path="/" component={Main} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
