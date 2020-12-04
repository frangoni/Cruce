import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import UsersTable from "./usersTable";

import { useDispatch, useSelector } from "react-redux";
import { fetchCadetes, fetchEmpresas } from "../../redux/actions/users";

import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//Iconos de la barra lateral
import ApartmentIcon from "@material-ui/icons/Apartment";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" id={`simple-tabpanel-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export function Panel({ users, selected }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  <IconButton color="inherit">
    <Badge badgeContent={4} color="secondary">
      <Tab label="Pendientes" />
    </Badge>
  </IconButton>;

  return (
    <div>
      <AppBar position="static">
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          style={{ height: "65px" }}
        >
          <Tab label="Aceptados" />
          <Tab label="Pendientes" />

          <Badge
            badgeContent={
              users.filter((user) => user.accepted === false).length
            }
            color="secondary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            overlap="rectangle"
          />
        </Tabs>
      </AppBar>
      <h1>{selected.trim().replace(/^\w/, (c) => c.toUpperCase())}</h1>
      <TabPanel value={value} index={0}>
        <UsersTable users={users.filter((user) => user.accepted === true)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UsersTable
          users={users.filter((user) => user.accepted === false)}
          showCheck
        />
      </TabPanel>
    </div>
  );
}

export default function AdminPanel() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const empresas = useSelector((state) => state.users.empresas);
  useEffect(() => {
    console.log("hola");
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
    console.log("ENtre", selected);
    if (selected === "cadetes") {
      setSelected("cadetes");
      setUsers(cadetes);
    } else if (selected === "empresas") {
      setSelected("empresas");
      setUsers(empresas);
    }
  };

  useEffect(() => {
    if (selected === "cadetes") {
      setUsers(cadetes);
    } else if (selected === "empresas") {
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
            Panel de Administrador
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
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key={"Cadetes"}
            onClick={() => handlerSelected("cadetes")}
          >
            <ListItemIcon>
              <MotorcycleIcon />
            </ListItemIcon>
            <ListItemText primary={"Cadetes"} />
          </ListItem>

          <ListItem
            button
            key={"Empresas"}
            onClick={() => handlerSelected("empresas")}
          >
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Empresas"} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Panel users={users} selected={selected} />
      </main>
    </div>
  );
}
