import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Link } from "react-router-dom";
import AdminPanel from './components/admin/panel'

export default function Main() {
  return (
    <>
      <button><Link to="/admin"> Admin</Link></button>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={AdminPanel} />
    </>
  );
}
