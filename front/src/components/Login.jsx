import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, setError } from "../redux/actions/user";
import { useInput } from "../hooks/useInput";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "& .MuiInputLabel-outlined": {
      color: "red",
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userEmail = useInput("email");
  const userPassword = useInput("password");
  const [errorLoginFront, setErrorLoginFront] = useState({});

  let history = useHistory();
  let statusLogin = useSelector((state) => state.animations.statusLogin);
  let isLoadingLogin = useSelector((state) => state.animations.isLoadingLogin);
  let errorBack = useSelector((state) => state.user.errorBack);

  let classInput = {
    email: "",
    password: "",
  };

  errorLoginFront.email ? (classInput.email = classes.root) : null;
  errorLoginFront.password ? (classInput.password = classes.root) : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorLoginFront({});
    let error = {};

    if (userEmail.value.length == 0) error = { ...error, email: true };
    if (userPassword.value.length == 0) error = { ...error, password: true };
    if (Object.keys(error).length) setErrorLoginFront(error);
    if (Object.keys(error).length == 0) {
      dispatch(
        fetchLogin({
          email: userEmail.value,
          password: userPassword.value,
        })
      );
    }
  };

  useEffect(() => {
    if (errorBack != "") {
      dispatch(setError(""));
    }
  }, [userEmail.value, userPassword.value]);

  useEffect(() => {
    if (statusLogin === 200) {
      history.push("/admin"); //cambiar luego
    }
  }, [statusLogin]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        {isLoadingLogin ? (
          <CircularProgress style={{ margin: "25px auto" }} />
        ) : null}

        {Object.keys(errorLoginFront).length ? (
          <Alert severity="error" style={{ margin: "25px auto" }}>
            Complete los datos obligatorios por favor.
          </Alert>
        ) : null}

        {errorBack ? (
          <Alert severity="error" style={{ margin: "25px auto" }}>
            Los datos ingresados no son válidos, intente nuevamente.
          </Alert>
        ) : null}

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            {...userEmail}
            className={classInput.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            {...userPassword}
            className={classInput.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"¿No tiene una cuenta? Regístrese"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
