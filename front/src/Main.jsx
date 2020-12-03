import React, { useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminPanel from "./components/admin/panel";
import Splash from "./components/splash";
import WebSocket from "./components/websocket";
import SingleOrder from "./components/SingleOrder";
import MyOrders from "./components/MyOrders"
import { useSelector } from "react-redux";

export default function Main() {
  const history = useHistory();
  const user = useSelector((state) => state.user.token);
  useEffect(() => {
    if (!user) history.push("/splash");
    return () => { };
  }, [user]);

  return (
    <>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/splash" component={Splash} />
      <Route path="/socket" component={WebSocket} />
      <Route path="/myorders" component={MyOrders} />
      <Route path="/order/:id" component={SingleOrder} />
    </>
  );
}
