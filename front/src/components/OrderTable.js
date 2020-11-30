import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const OrdersTable = ({ orders, handler }) => {
    const classes = useStyles();
    return (<div>
        {orders.length ? <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                    <caption>Listado de Cadetes/Empresas</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">E-mail</TableCell>
                            <TableCell align="center">Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell align="center">{order.orderId}</TableCell>
                                <TableCell align="center">{order.client.name}</TableCell>
                                <TableCell align="center">{order.client.email}</TableCell>
                                <TableCell align="center">{order.state}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handler(order.id)} aria-label="delete" className={classes.margin} size="medium">
                                        <CheckIcon fontSize="inherit" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div> : null

        }
    </div>
    )
}

export default OrdersTable