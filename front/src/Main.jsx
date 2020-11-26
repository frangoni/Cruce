import React, { useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Panel from "./components/admin/panel";
import SheetUpload from "./components/SheetUpload";
import Splash from "./components/splash"
import SideBar from "./components/SideBar"

import { useSelector } from 'react-redux'
export default function Main() {
  const history = useHistory();
  const user = useSelector(state => state.user.user)
  useEffect(() => {
    if (!user)
      history.push("/splash")
    return () => { }
  }, [user])

  return (
    <>
      <Route path="/register" component={Register} />
      <Route path="/excel" render={() => (<SideBar><SheetUpload /></SideBar>)} />
      <button>
        <Link to="/admin"> Admin</Link>
      </button>
      <Route path="/login" component={Login} />
      <Route path="/admin" render={() => (<SideBar><Panel /></SideBar>)} />
      <Route path="/splash" component={Splash} />
    </>
  );
}
