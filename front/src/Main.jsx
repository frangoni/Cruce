import React, { useEffect } from "react";
import { Route, useHistory, Switch, Redirect } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Panel from "./components/admin/panel";
import Splash from "./components/splash";
import WebSocket from "./components/websocket";
import SingleOrder from "./components/SingleOrder";
import MyOrders from "./components/MyOrders";
import Cadeterias from "./components/cadeterias";
import ResetPassword from "./components/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./components/SideBar";
import Metricas from "./components/Metricas";
import { fetchMe } from "./redux/actions/user";

export default function Main() {
  const history = useHistory();
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token && !(history.location.pathname.match(/\/reset/) || history.location.pathname === "/registro")) {
      history.push("/inicio");
    }
    return () => {};
  }, [token]);

  useEffect(() => {
    if (token) dispatch(fetchMe());
    const id = setInterval(() => {
      dispatch(fetchMe());
    }, 1000 * 60 * 10);
    return () => clearInterval(id);
  }, []);

  return (
    <Switch>
      <Route path="/inicio" component={Splash} />
      <Route path="/ingreso" component={Login} />
      <Route path="/registro" component={Register} />
      <Route path="/reset/:uuid" component={ResetPassword} />
      <Route path="/reset" component={ResetPassword} />
      <Route
        path="/admin"
        render={() => (
          <SideBar title="Panel de Administrador">
            <Panel />
          </SideBar>
        )}
      />
      <Route
        path="/ordenes"
        render={() => (
          <SideBar title="Ordenes Activas">
            <WebSocket />
          </SideBar>
        )}
      />
      <Route
        path="/misordenes"
        render={() => (
          <SideBar title={user.role == "Admin" ? "Ordenes" : "Mis Ordenes"}>
            <MyOrders />
          </SideBar>
        )}
      />
      <Route
        path="/orden/:id"
        render={({ match }) => (
          <SideBar title="Orden">
            <SingleOrder match={match} />
          </SideBar>
        )}
      />
      <Route
        path="/cadeterias"
        render={({ match }) => (
          <SideBar title="Orden">
            <Cadeterias match={match} />
          </SideBar>
        )}
      />
      <Route
        path="/perfil/:id"
        render={({ match }) => (
          <SideBar title="Metricas">
            <Metricas match={match} />
          </SideBar>
        )}
      />
      {token ? <Redirect to="/ordenes" /> : <Redirect to="/inicio" />}
    </Switch>
  );
}
