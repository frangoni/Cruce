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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";

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
  const userCompany = useInput("company");
  const userAddress = useInput("address");
  const userDni = useInput("dni");
  const userLicensePlate = useInput("licensePlate");

  const [moto, setMoto] = useState({
    checkedA: false,
  });

  const [role, setRole] = useState("Empresa");

  const handleRole = (event, role) => {
    setRole(role);
  };

  const [errorRegisterFront, setErrorRegisterFront] = useState({});

  const classInput = {
    name: "",
    email: "",
    password: "",
    company: "",
    address: "",
    dni: "",
  };

  const handleSwitchChange = (event) => {
    setMoto({ ...moto, [event.target.name]: event.target.checked });
    console.log("moto", moto);
  };

  errorRegisterFront.name ? (classInput.name = classes.root) : null;
  errorRegisterFront.email ? (classInput.email = classes.root) : null;
  errorRegisterFront.password ? (classInput.password = classes.root) : null;
  errorRegisterFront.company ? (classInput.company = classes.root) : null;
  errorRegisterFront.address ? (classInput.address = classes.root) : null;
  errorRegisterFront.dni ? (classInput.dni = classes.root) : null;

  const dispatch = useDispatch();

  const isLoadingRegister = useSelector(
    (state) => state.animations.isLoadingRegister
  );
  const statusRegister = useSelector((state) => state.animations.statusRegister);
  const errorBack = useSelector((state) => state.user.errorBack);

  const history = useHistory();

  useEffect(() => {
    if (statusRegister === 201) {
      setTimeout(() => {
        history.push("/splash")
      }, 5000)
    }
  }, [statusRegister]);

  useEffect(() => {
    if (errorBack != "") {
      dispatch(setError(""));
    }
  }, [
    userInput.value,
    userEmail.value,
    userPassword.value,
    userCompany.value,
    userAddress.value,
    userDni.value,
    userLicensePlate.value,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorRegisterFront({});
    let error = {};

    if (userInput.value.length == 0) {
      error = { ...error, name: true };
    }
    if (userEmail.value.length == 0) error = { ...error, email: true };
    if (userPassword.value.length == 0) error = { ...error, password: true };
    if (userCompany.value.length == 0) error = { ...error, company: true };
    if (userAddress.value.length == 0 && role === "Empresa")
      error = { ...error, address: true };
    if (userDni.value.length == 0 && role === "Cadete")
      error = { ...error, dni: true };

    if (Object.keys(error).length) setErrorRegisterFront(error);
    console.log('OBJETO', {
      name: userInput.value,
      email: userEmail.value,
      password: userPassword.value,
      company: userCompany.value,
      role,
      address: userAddress.value,
      dni: userDni.value,
      licensePlate: userLicensePlate.value
    })
    if (Object.keys(error).length == 0) {
      dispatch(
        fetchRegister({
          name: userInput.value,
          email: userEmail.value,
          password: userPassword.value,
          company: userCompany.value,
          role,
          address: userAddress.value,
          dni: userDni.value || null,
          licensePlate: userLicensePlate.value
        })
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrate
        </Typography>

        <Grid container justify="flex-end">
          {isLoadingRegister ? (
            <CircularProgress style={{ margin: "25px auto" }} />
          ) : null}
        </Grid>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ marginBottom: "5%" }}
            >
              <ToggleButtonGroup
                value={role}
                exclusive
                onChange={handleRole}
                aria-label="text alignment"
              >
                <ToggleButton
                  value="Empresa"
                  label="Empresa"
                  disabled={isLoadingRegister ? true : false}
                >
                  Empresa
                </ToggleButton>
                <ToggleButton
                  value="Cadete"
                  label="Cadete"
                  disabled={isLoadingRegister ? true : false}
                >
                  Cadete
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classInput.name}
                required={true}
                autoComplete="fname"
                variant="outlined"
                fullWidth
                id="firstName"
                label="Nombre Completo"
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
                label="Email"
                autoComplete="Email"
                {...userEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classInput.password}
                variant="outlined"
                required
                fullWidth
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                {...userPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classInput.company}
                variant="outlined"
                required
                fullWidth
                label="Empresa"
                type="company"
                id="company"
                autoComplete="company"
                {...userCompany}
              />
            </Grid>

            {role === "Empresa" ? (
              <Grid item xs={12}>
                <TextField
                  className={classInput.address}
                  variant="outlined"
                  required
                  fullWidth
                  label="Direccion"
                  type="address"
                  id="address"
                  autoComplete="address"
                  {...userAddress}
                />
              </Grid>
            ) : (
              <React.Fragment>
                <Grid item xs={12}>
                  <TextField
                    className={classInput.dni}
                    variant="outlined"
                    required
                    fullWidth
                    label="DNI"
                    type="dni"
                    id="dni"
                    autoComplete="dni"
                    {...userDni}
                  />
                </Grid>

                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <FormGroup row>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch
                          checked={moto.checkedA}
                          onChange={handleSwitchChange}
                          name="checkedA"
                          color="primary"
                          disabled={isLoadingRegister ? true : false}
                        />
                      }
                      label="Tengo moto"
                    />
                  </FormGroup>
                </Grid>

                {moto.checkedA ? (
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Patente"
                      type="licensePlate"
                      id="licensePlate"
                      autoComplete="licensePlate"
                      {...userLicensePlate}
                    />
                  </Grid>
                ) : null}
              </React.Fragment>
            )}
          </Grid>
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
          </Grid>

          {statusRegister == 201 ? (
            <Grid container justify="flex-end">
              <Alert severity="info" style={{ margin: "25px auto" }}>
                Se ha registrado correctamente. Aguarda a recibir un email de confirmación. Te esperamos!
              </Alert>
            </Grid>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoadingRegister || statusRegister == 201 ? true : false}
          >
            Enviar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Ya tiene una cuenta? Inicie sesión.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
