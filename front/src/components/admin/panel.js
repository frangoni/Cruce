import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import UsersPanel from "./usersPanel"
import CompaniesPanel from './companiesPanel'

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



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));



export default function AdminPanel() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Cadetes" />
                    <Tab label="Empresas" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <UsersPanel />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CompaniesPanel />
            </TabPanel>
        </div>
    );
}