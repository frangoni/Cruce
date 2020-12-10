import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { fetchCadetes, fetchEmpresas } from "../redux/actions/users";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
//Iconos de la barra lateral
import ApartmentIcon from "@material-ui/icons/Apartment";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";

import { useStyles } from "../style/sidebar";
import { userLogout } from "../redux/actions/user";
import { useHistory } from "react-router-dom";

export default function SideBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const setLogout = () => {
    dispatch(userLogout());
    history.push("/inicio");
  };

  const empresas = useSelector((state) => state.users.empresas);
  const isAdmin = useSelector((state) =>
    state.user.user.role === "Admin" ? true : false
  );
  useEffect(() => {
    dispatch(fetchEmpresas());
    return () => {};
  }, []);

  const cadetes = useSelector((state) => state.users.cadetes);
  useEffect(() => {
    dispatch(fetchCadetes());
    return () => {};
  }, []);

  const [users, setUsers] = useState(cadetes);
  const [selected, setSelected] = useState("cadetes");

  const handlerSelected = (selected) => {
    if (selected === "cadetes") {
      setSelected("cadetes");
      setUsers(cadetes);
    } else if (selected === "tiendas") {
      setSelected("tiendas");
      setUsers(empresas);
    }
  };

  useEffect(() => {
    if (selected === "cadetes") {
      setUsers(cadetes);
    } else if (selected === "tiendas") {
      setUsers(empresas);
    }
    return () => {};
  }, [cadetes, empresas]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
            <ListItemText primary={"Cruce"} />
          </IconButton>
        </div>
        <Divider />

        {isAdmin ? (
          <List>
            <ListItemText primary={"Administrar usuarios"} />
            <ListItem
              button
              key={"Cadetes"}
              onClick={() => handlerSelected("cadetes")}
            >
              <ListItemIcon>
                <MotorcycleIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={"Cadetes"} />
            </ListItem>

            <ListItem
              button
              key={"Tiendas"}
              onClick={() => handlerSelected("tiendas")}
            >
              <ListItemIcon>
                <ApartmentIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={"Tiendas"} />
            </ListItem>
          </List>
        ) : (
          <List>
            <Link style={{ textDecoration: "none" }} to="/misordenes">
              {" "}
              <ListItem button key={"orden"}>
                <ListItemIcon>
                  {" "}
                  <LibraryAddCheckIcon style={{ color: "green" }} />{" "}
                </ListItemIcon>
                <ListItemText primary={"Mis Ordenes"} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/ordenes">
              {" "}
              <ListItem button key={"ordenes"}>
                <ListItemIcon>
                  {" "}
                  <LibraryAddIcon style={{ color: "blue" }} />{" "}
                </ListItemIcon>
                <ListItemText primary={"Ordenes Activas"} />
              </ListItem>
            </Link>
            <ListItem button key={"perfil"}>
              <ListItemIcon>
                {" "}
                <AccountBoxIcon />{" "}
              </ListItemIcon>
              <ListItemText primary={"Mi perfil"} />
            </ListItem>{" "}
          </List>
        )}
        <Divider />

        <Divider />
        <ListItem button key={"Salir"} onClick={setLogout}>
          <ListItemIcon>
            {" "}
            <PowerSettingsNewIcon color="error" />{" "}
          </ListItemIcon>
          <ListItemText primary={"Salir"} />
        </ListItem>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />

        {/* <Panel users={users} selected={selected} /> */}
        {/* {props.children} */}
        {React.Children.map(props.children, (child) => {
          // checking isValidElement is the safe way and avoids a typescript error too
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { users, selected });
          }
          return child;
        })}
      </main>
    </div>
  );
}
