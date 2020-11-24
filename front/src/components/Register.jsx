import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { fetchRegister, setError } from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
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
    width: "100%",
    marginTop: theme.spacing(3),
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

export default function SignUp() {
  const classes = useStyles();

  const userInput = useInput("fullName");
  const userEmail = useInput("email");
  const userPassword = useInput("password");
  //const userCompany = useInput("company");

  const [role, setRole] = useState("Empresa");
  const [errorRegisterFront, setErrorRegisterFront] = useState({});

  let classInput = {
    name: "",
    email: "",
    password: "",
  };

  errorRegisterFront.name ? (classInput.name = classes.root) : null;
  errorRegisterFront.email ? (classInput.email = classes.root) : null;
  errorRegisterFront.password ? (classInput.password = classes.root) : null;

  const dispatch = useDispatch();

  let isLoadingRegister = useSelector((state) => state.user.isLoadingRegister);
  let statusRegister = useSelector((state) => state.user.statusRegister);
  let errorBack = useSelector((state) => state.user.errorBack);

  let history = useHistory();

  useEffect(() => {
    if (statusRegister === 201) {
      history.push("/login");
    }
  }, [statusRegister]);

  useEffect(() => {
    if (errorBack != "") {
      dispatch(setError(""));
    }
  }, [userInput.value, userEmail.value, userPassword.value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorRegisterFront({});
    let error = {};

    if (userInput.value.length == 0) {
      error = { ...error, name: true };
    }
    if (userEmail.value.length == 0) error = { ...error, email: true };
    if (userPassword.value.length == 0) error = { ...error, password: true };
    if (Object.keys(error).length) setErrorRegisterFront(error);
    if (Object.keys(error).length == 0) {
      dispatch(
        fetchRegister({
          name: userInput.value,
          email: userEmail.value,
          password: userPassword.value,
          role,
        })
      );
    } 
  };

  console.log("ERROR FRONT", Object.keys(errorRegisterFront));
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Grid container justify="flex-end">
          {errorBack ? (
            <Alert severity="error" style={{ margin: "25px auto" }}>
              Los datos ingresados no son válidos o ya existen, intente
              nuevamente.
            </Alert>
          ) : null}
          {Object.keys(errorRegisterFront).length ? (
            <Alert severity="error" style={{ margin: "25px auto" }}>
              Complete los datos obligatorios por favor.
            </Alert>
          ) : null}
          {isLoadingRegister ? (
            <CircularProgress style={{ margin: "25px auto" }} />
          ) : null}
        </Grid>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classInput.name}
                required={true}
                autoComplete="fname"
                variant="outlined"
                fullWidth
                id="firstName"
                label="Full Name"
                autoFocus
                {...userInput}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classInput.email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...userEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classInput.password}
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...userPassword}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Company"
                type="company"
                id="company"
                autoComplete="company"
                {...userPassword}
              />
            </Grid> */}
            <RadioGroup
              aria-label="gender"
              name="gender1"
              style={{ margin: "0 auto" }}
              value={role}
              onChange={(e, v) => {
                setRole(v);
              }}
            >
              <FormControlLabel
                value="Empresa"
                control={<Radio />}
                label="Empresa"
              />

              <FormControlLabel
                value="Cadete"
                control={<Radio />}
                label="Cadete"
              />
            </RadioGroup>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoadingRegister == true ? true : false}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
