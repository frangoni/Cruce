import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";

//Redux
import { useDispatch } from "react-redux";
import {
  fetchAcceptUserById,
  deleteUser,
  fetchCadetes,
  fetchEmpresas,
} from "../../redux/actions/users";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UsersTable({ users, showCheck }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handlerCheckClick = (id, role) => {
    dispatch(fetchAcceptUserById(id, role));
    dispatch(fetchCadetes());
    dispatch(fetchEmpresas());
  };

  const handlerDeleteClick = (id) => {
    dispatch(deleteUser({ content: id }));
    dispatch(fetchCadetes());
    dispatch(fetchEmpresas());
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>Listado de Cadetes/Empresas</caption>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">E-mail</TableCell>
            <TableCell align="center">Empresa</TableCell>
            <TableCell align="center">Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="center">{user.id}</TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.company}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  size="medium"
                >
                  <DeleteIcon
                    fontSize="inherit"
                    onClick={() => handlerDeleteClick(user.id)}
                  />
                </IconButton>
                {showCheck ? (
                  <IconButton
                    onClick={() => handlerCheckClick(user.id, user.role)}
                    aria-label="accept"
                    className={classes.margin}
                    size="medium"
                  >
                    <CheckIcon fontSize="inherit" />
                  </IconButton>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
