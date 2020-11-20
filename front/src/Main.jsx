import React from "react";
import { Route } from "react-router-dom";
import Register from "./components/Register";
import SheetTest from "./components/SheetTest";

export default function Main() {
  return (
    <>
      <Route path="/register" component={Register} />
      <Route path="/excel" component={SheetTest} />
    </>
  );
}
