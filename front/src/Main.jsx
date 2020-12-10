import React, { useEffect } from "react";
import { Route, Link, useHistory, Switch, Redirect } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Panel from "./components/admin/panel";

import Splash from "./components/splash";
import WebSocket from "./components/websocket";
import SingleOrder from "./components/SingleOrder";
import MyOrders from "./components/MyOrders"
import { useSelector } from "react-redux";

import SideBar from "./components/SideBar"




export default function Main() {
  const history = useHistory();
  const user = useSelector((state) => state.user.token);
  useEffect(() => {
    if (!user) history.push("/inicio");
    return () => { };
  }, [user]);

  return (
    <> <Switch>
      <Route path="/inicio" component={Splash} />
      <Route path="/ingreso" component={Login} />
      <Route path="/registro" component={Register} />
      <Route path="/admin" render={() => (<SideBar title="Panel de Administrador" ><Panel /></SideBar>)} />
      <Route path="/ordenes" render={() => (<SideBar title="Ordenes Activas" ><WebSocket /></SideBar>)} />
      <Route path="/misordenes" render={() => (<SideBar title="Mis Ordenes"><MyOrders /></SideBar>)} />
      <Route path="/orden/:id" render={({ match }) => (<SideBar title="Orden"><SingleOrder match={match} /></SideBar>)} />
      {user ? <Redirect to="/ordenes" /> : <Redirect to="/inicio" />}
    </Switch>
    </>
  );
}
