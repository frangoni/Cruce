import React, { useState, useEffect } from "react";
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
import Alert from "@material-ui/lab/Alert";
import Confirmacion from "../Confirmacion";

//Redux
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
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedRow, setSelected] = useState({ id: null, role: null });
  const handlerCheckClick = (id, role) => {
    setOpen(true);
    setTitle("Aceptar");
    setSelected({ id, role });
  };

  const handlerDeleteClick = (id, role) => {
    setTitle("Rechazar");
    setSelected({ id, role });
    setOpen(true);
  };

  const accept = () => {
    setOpen(false);
    if (title === "Aceptar") {
      if (!selectedRow.role) {
        dispatch(fetchAcceptCadeteriaById(selectedRow.id));
      } else {
        dispatch(fetchAcceptUserById(selectedRow.id, selectedRow.role));
      }
      dispatch(fetchEmpresas());
      dispatch(fetchCadetes());
      dispatch(fetchCadeterias());
    } else if (title === "Rechazar") {
      if (!selectedRow.role) {
        dispatch(deleteCadeteria({ content: selectedRow.id }));
      } else {
        dispatch(deleteUser({ content: selectedRow.id }));
      }
      dispatch(fetchEmpresas());
      dispatch(fetchCadetes());
      dispatch(fetchCadeterias());
    }
    setTitle("");
    setSelected({ id: null, role: null });
  };

  const deny = () => {
    setOpen(false);
    setTitle("");
    setSelected({ id: null, role: null });
  };

  return (
    <TableContainer component={Paper}>
      <Confirmacion open={open} accept={accept} title={title} deny={deny} />
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
                        aria-label="delete"
                        className={classes.margin}
                        size="medium"
                        onClick={() => handlerCheckClick(user.id, user.role)}
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
