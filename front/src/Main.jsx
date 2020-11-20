import React from "react";
import { Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import SheetTest from "./components/SheetTest";
import AdminPanel from "./components/admin/panel";

export default function Main() {
  return (
    <>
      <Route path="/register" component={Register} />
      <Route path="/excel" component={SheetTest} />
      <button>
        <Link to="/admin"> Admin</Link>
      </button>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={AdminPanel} />
    </>
  );
}
