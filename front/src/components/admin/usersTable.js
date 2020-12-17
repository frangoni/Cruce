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
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { useDispatch } from "react-redux";
import { fetchAcceptUserById, deleteUser, fetchCadetes, fetchEmpresas } from "../../redux/actions/users";
import { fetchAcceptCadeteriaById, fetchCadeterias, deleteCadeteria } from "../../redux/actions/cadeteria";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UsersTable({ users, showCheck, selected }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlerCheckClick = (id, role) => {
    if (!role) {
      dispatch(fetchAcceptCadeteriaById(id));
    } else {
      dispatch(fetchAcceptUserById(id, role));
    }
    dispatch(fetchEmpresas());
    dispatch(fetchCadetes());
    dispatch(fetchCadeterias());
  };

  const handlerDeleteClick = (id, role) => {
    if (!role) {
      dispatch(deleteCadeteria({ content: id }));
    } else {
      dispatch(deleteUser({ content: id }));
    }
    dispatch(fetchEmpresas());
    dispatch(fetchCadetes());
    dispatch(fetchCadeterias());
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>Listado de {selected && selected.trim().replace(/^\w/, (c) => c.toUpperCase())}</caption>
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            {selected != "cadeterias" ? <TableCell align="center">E-mail</TableCell> : null}
            {selected == "cadetes" ? <TableCell align="center">Cadetería</TableCell> : null}
            <TableCell align="center">Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="center">{user.name}</TableCell>
              {selected != "cadeterias" ? <TableCell align="center">{user.email}</TableCell> : null}
              {selected == "cadetes" ? <TableCell align="center">{user.cadeteria[0].name}</TableCell> : null}
              <TableCell align="center">
                {user.role == "Cadete" && user.cadeteria.length > 0 && user.cadeteria[0].accepted === false ? (
                  <div className="aceptarPrimeroCadeteria">
                    <strong>Aceptar primero la cadeteria</strong>
                  </div>
                ) : (
                  <>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      size="medium"
                      onClick={() => handlerDeleteClick(user.id, user.role)}
                    >
                      <DeleteIcon fontSize="inherit" />
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
                    {selected != "cadeterias" ? (
                      <Link to={`/perfil/${user.id}`}>
                        <IconButton aria-label="view" className={classes.margin} size="medium">
                          <VisibilityOutlinedIcon fontSize="inherit" />
                        </IconButton>
                      </Link>
                    ) : null}
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
