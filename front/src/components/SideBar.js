import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { useDispatch, useSelector } from 'react-redux'
import { fetchCadetes, fetchEmpresas } from '../redux/actions/users'

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//Iconos de la barra lateral
import ApartmentIcon from '@material-ui/icons/Apartment';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';

import { useStyles } from '../style/sidebar'

import Panel from "./admin/panel"

export default function SideBar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const empresas = useSelector(state => state.users.empresas)
    useEffect(() => {
        dispatch(fetchEmpresas())
        return () => { }
    }, [])

    const cadetes = useSelector(state => state.users.cadetes)
    useEffect(() => {
        dispatch(fetchCadetes())
        return () => { }
    }, [])


    const [users, setUsers] = useState(cadetes)
    const [selected, setSelected] = useState("cadetes")

    const handlerSelected = (selected) => {
        if (selected === "cadetes") {
            setSelected("cadetes")
            setUsers(cadetes)
        }
        else if (selected === "empresas") {
            setSelected("empresas")
            setUsers(empresas)
        }
    }

    useEffect(() => {
        if (selected === "cadetes") {
            setUsers(cadetes)
        }
        else if (selected === "empresas") {
            setUsers(empresas)
        }
        return () => { }
    }, [cadetes, empresas])

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
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key={"Cadetes"}>
                        <ListItemIcon><MotorcycleIcon onClick={() => handlerSelected("cadetes")} /> </ListItemIcon>
                        <ListItemText primary={"Cadetes"} />
                    </ListItem>

                    <ListItem button key={"Empresas"}>
                        <ListItemIcon><ApartmentIcon onClick={() => handlerSelected("empresas")} /> </ListItemIcon>
                        <ListItemText primary={"Empresas"} />
                    </ListItem>

                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />

                {/* <Panel users={users} selected={selected} /> */}
                {/* {props.children} */}
                {React.Children.map(props.children, child => {
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