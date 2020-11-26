import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import UsersTable from './usersTable'

import { useDispatch, useSelector } from 'react-redux'
import { fetchCadetes, fetchEmpresas } from '../../redux/actions/users'

import clsx from 'clsx';


import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//Iconos de la barra lateral
import ApartmentIcon from '@material-ui/icons/Apartment';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';

import { useStyles } from '../../style/sidebar'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}




export default function Panel({ users, selected }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
            <Tab label="Pendientes" />
        </Badge>
    </IconButton>

    return (
        <div >
            <AppBar position="static">
                <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example" style={{ height: "65px" }}>
                    <Tab label="Aceptados" />
                    <Tab label="Pendientes" />

                    <Badge badgeContent={users.filter(user => user.accepted === false).length} color="secondary" anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }} overlap="rectangle" />



                </Tabs>
            </AppBar>
            <h1>{selected.trim().replace(/^\w/, (c) => c.toUpperCase())}</h1>
            <TabPanel value={value} index={0}>
                <UsersTable users={users.filter(user => user.accepted === true)} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UsersTable users={users.filter(user => user.accepted === false)} showCheck />
            </TabPanel>
        </div>
    );
}