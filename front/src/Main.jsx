import React, { useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminPanel from "./components/admin/panel";
import SheetUpload from "./components/SheetUpload";
import Splash from "./components/splash";
import { useSelector } from "react-redux";
export default function Main() {
  const history = useHistory();
  const user = useSelector((state) => state.user.token);
  useEffect(() => {
    if (!user) history.push("/splash");
    return () => {};
  }, [user]);

  return (
    <>
      <Route path="/register" component={Register} />
      <Route path="/excel" component={SheetUpload} />

      <Route path="/login" component={Login} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/splash" component={Splash} />
    </>
  );
}
