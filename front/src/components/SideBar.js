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
import StoreIcon from "@material-ui/icons/Store";
import GroupIcon from "@material-ui/icons/Group";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useStyles } from "../style/sidebar";
import { userLogout } from "../redux/actions/user";
import { useHistory } from "react-router-dom";
import { fetchCadeterias } from "../redux/actions/cadeteria";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

export default function SideBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = () => {
    setOpenMenu(!openMenu);
    if (open == false) {
      setOpen(true);
    }
  };

  const setLogout = () => {
    dispatch(userLogout());
    history.push("/inicio");
  };

  const cadeterias = useSelector((state) => state.cadeterias.allCadeterias);

  const empresas = useSelector((state) => state.users.empresas);
  const isAdmin = useSelector((state) => (state.user.user.role === "Admin" ? true : false));
  const isTienda = useSelector((state) => (state.user.user.role === "Empresa" ? true : false));
  const { name, id, role } = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchEmpresas());
    dispatch(fetchCadetes());
    dispatch(fetchCadeterias());
    return () => {};
  }, []);

  const cadetes = useSelector((state) => state.users.cadetes);

  const [users, setUsers] = useState(cadetes);
  const [selected, setSelected] = useState("cadetes");

  const handlerSelected = (selected) => {
    if (selected === "cadetes") {
      setSelected("cadetes");
      setUsers(cadetes);
    } else if (selected === "tiendas") {
      setSelected("tiendas");
      setUsers(empresas);
    } else if (selected === "cadeterias") {
      setSelected("cadeterias");
      setUsers(cadeterias);
    }
    dispatch(fetchEmpresas());
    dispatch(fetchCadetes());
    dispatch(fetchCadeterias());
  };

  useEffect(() => {
    if (selected === "cadetes") {
      setUsers(cadetes);
    } else if (selected === "tiendas") {
      setUsers(empresas);
    } else if (selected === "cadeterias") {
      setUsers(cadeterias);
    }
    return () => {};
  }, [cadetes, empresas, cadeterias]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenMenu(false);
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
            {` || ${name} `}
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
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            <ListItemText primary={"Cruce"} />
          </IconButton>
        </div>
        <Divider />

        {isAdmin ? (
          <List>
            <Link style={{ textDecoration: "none" }} to="/admin">
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
                {openMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    key={"Cadeterias"}
                    onClick={() => handlerSelected("cadeterias")}
                    style={{ marginLeft: "20px" }}
                  >
                    <ListItemIcon>
                      <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Cadeterias"} />
                  </ListItem>

                  <ListItem
                    button
                    key={"Cadetes"}
                    onClick={() => handlerSelected("cadetes")}
                    style={{ marginLeft: "20px" }}
                  >
                    <ListItemIcon>
                      <MotorcycleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Cadetes"} />
                  </ListItem>

                  <ListItem
                    button
                    key={"Tiendas"}
                    onClick={() => handlerSelected("tiendas")}
                    style={{ marginLeft: "20px" }}
                  >
                    <ListItemIcon>
                      <ApartmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Tiendas"} />
                  </ListItem>
                </List>
              </Collapse>
            </Link>

            <Divider />
            <Link style={{ textDecoration: "none" }} to="/misordenes">
              <ListItem button key={"orden"}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary={"Órdenes"} />
              </ListItem>
            </Link>
          </List>
        ) : (
          <List>
            <Link style={{ textDecoration: "none" }} to="/misordenes">
              <ListItem button key={"orden"}>
                <ListItemIcon>
                  <LibraryAddCheckIcon style={{ color: "green" }} />
                </ListItemIcon>
                <ListItemText primary={isTienda ? "Ordenes Finalizadas" : "Mis Ordenes"} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/ordenes">
              <ListItem button key={"ordenes"}>
                <ListItemIcon>
                  <LibraryAddIcon style={{ color: "blue" }} />
                </ListItemIcon>
                <ListItemText primary={"Ordenes Activas"} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: "none" }} to={`/perfil/${id}`}>
              <ListItem button key={"perfil"}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"Mi perfil"} />
              </ListItem>
            </Link>
          </List>
        )}
        <Divider />

        <Divider />
        <ListItem button key={"Salir"} onClick={setLogout}>
          <ListItemIcon>
            <PowerSettingsNewIcon color="error" />
          </ListItemIcon>
          <ListItemText primary={"Salir"} />
        </ListItem>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />

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
