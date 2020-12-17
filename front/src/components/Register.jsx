import React, { useState, useEffect } from "react";
import { useHistory, Link as RLink } from "react-router-dom";
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
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { fetchAcceptedCadeterias } from "../redux/actions/cadeteria";
import { userRegisterAnimation } from "../redux/actions/user";

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
  margin: {
    width: "100%",
  },
  dropdown: {
    border: "1px solid red",
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function SignUp() {
  const classes = useStyles();
  const userInput = useInput("fullName");
  const userEmail = useInput("email");
  const userPassword = useInput("password");
  const userAddress = useInput("address");
  const userDni = useInput("dni");
  const userLicensePlate = useInput("licensePlate");
  const userCadeteria = useInput("cadeteria");
  const userNewCadeteria = useInput("newCadeteria");
  const [moto, setMoto] = useState({
    checkedA: false,
  });
  const [role, setRole] = useState("Empresa");
  const handleRole = (event, role) => {
    setErrorRegisterFront({});
    setRole(lastRole => role ? role : lastRole);
  };
  const [selectCadeteria, setSelectCadeteria] = useState("");
  const [errorRegisterFront, setErrorRegisterFront] = useState({});

  const classInput = {
    name: "",
    email: "",
    password: "",
    address: "",
    dni: "",
    newCadeteria: "",
    cadeteria: "",
    licensePlate: "",
  };

  const handleSwitchChange = (event) => {
    setMoto({ ...moto, [event.target.name]: event.target.checked });
  };

  errorRegisterFront.name ? (classInput.name = classes.root) : null;
  errorRegisterFront.email ? (classInput.email = classes.root) : null;
  errorRegisterFront.password ? (classInput.password = classes.root) : null;

  errorRegisterFront.address ? (classInput.address = classes.root) : null;
  errorRegisterFront.dni ? (classInput.dni = classes.root) : null;
  errorRegisterFront.newCadeteria ? (classInput.newCadeteria = classes.root) : null;
  errorRegisterFront.cadeteria ? (classInput.cadeteria = classes.dropdown) : null;
  errorRegisterFront.licensePlate ? (classInput.licensePlate = classes.root) : null;

  const dispatch = useDispatch();

  const isLoadingRegister = useSelector((state) => state.animations.isLoadingRegister);
  const statusRegister = useSelector((state) => state.animations.statusRegister);
  const errorBack = useSelector((state) => state.user.errorBack);
  const cadeterias = useSelector((state) => state.cadeterias.acceptedCadeterias);
  const history = useHistory();

  const handleCadeteriaChange = (e) => {
    const event = e.target.value;
    setSelectCadeteria(event);
  };

  useEffect(() => {
    dispatch(fetchAcceptedCadeterias());
  }, []);

  useEffect(() => {
    if (statusRegister === 201) {
      setTimeout(() => {
        history.push("/inicio");
        dispatch(userRegisterAnimation(null, null));
        //una vez hecho el push hay que pasar el status register a ""
      }, 5000);
    }
  }, [statusRegister]);

  useEffect(() => {
    if (errorBack != "") {
      dispatch(setError(""));
    }
  }, [userInput.value, userEmail.value, userPassword.value, userAddress.value, userDni.value, userLicensePlate.value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorRegisterFront({});
    let error = {};
    if (userInput.value.length == 0) {
      error = { ...error, name: true };
    }
    if (userEmail.value.length == 0) error = { ...error, email: true };
    if (userPassword.value.length == 0) error = { ...error, password: true };
    if (userAddress.value.length == 0 && role === "Empresa") error = { ...error, address: true };
    if (userDni.value.length == 0 && role === "Cadete") error = { ...error, dni: true };
    if (userCadeteria.value === "Otra" && userNewCadeteria.value.length === 0 && role == "Cadete") {
      error = { ...error, newCadeteria: true };
    }
    if (userCadeteria.value == "" && userCadeteria.value.length === 0 && role == "Cadete") {
      error = { ...error, cadeteria: true };
    }
    if (userLicensePlate.value.length == 0 && role == "Cadete" && moto.checkedA === true)
      error = { ...error, licensePlate: true };

    if (Object.keys(error).length) setErrorRegisterFront(error);

    if (Object.keys(error).length == 0) {
      dispatch(
        fetchRegister({
          name: userInput.value,
          email: userEmail.value,
          password: userPassword.value,
          role,
          address: userAddress.value,
          dni: userDni.value || null,
          licensePlate: userLicensePlate.value,
          cadeteria: userNewCadeteria.value ? userNewCadeteria.value : userCadeteria.value,
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
          {isLoadingRegister ? <CircularProgress style={{ margin: "25px auto" }} /> : null}
        </Grid>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid container direction="column" justify="center" alignItems="center" style={{ marginBottom: "5%" }}>
              <ToggleButtonGroup value={role} exclusive onChange={handleRole} aria-label="text alignment">
                <ToggleButton value="Empresa" label="Empresa" disabled={isLoadingRegister ? true : false}>
                  Empresa
                </ToggleButton>
                <ToggleButton value="Cadete" label="Cadete" disabled={isLoadingRegister ? true : false}>
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

            {role === "Empresa" ? (
              <>
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
              </>
            ) : role === "Cadete" ? (
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

                <Grid item xs={12}>
                  <FormControl className={classes.margin} onChange={handleCadeteriaChange}>
                    <NativeSelect
                      id="demo-customized-select-native"
                      input={<BootstrapInput />}
                      {...userCadeteria}
                      className={classInput.cadeteria}
                    >
                      <option value="" disabled>
                        Seleccione su cadetería:
                      </option>
                      {cadeterias.length > 0 &&
                        cadeterias.map((cadeteria) => {
                          return (
                            <>
                              <option value={cadeteria.name}>{cadeteria.name}</option>
                            </>
                          );
                        })}
                      <option value="Otra">Otra</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
                {selectCadeteria === "Otra" ? (
                  <Grid item xs={12}>
                    <p className="parrafo">Si su cadetería no se encuentra en la lista previa, regístrela aquí.</p>

                    <TextField
                      variant="outlined"
                      fullWidth
                      required
                      id="cadeteria"
                      autoComplete="Cadeteria"
                      {...userNewCadeteria}
                      className={classInput.newCadeteria}
                    />
                  </Grid>
                ) : null}

                <Grid container direction="column" justify="center" alignItems="center">
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
                      className={classInput.licensePlate}
                    />
                  </Grid>
                ) : null}
              </React.Fragment>
            ) : null}
          </Grid>
          <Grid container justify="flex-end">
            {errorBack ? (
              <Alert severity="error" style={{ margin: "25px auto" }}>
                Los datos ingresados no son válidos o ya existen, intente nuevamente.
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
              <Link variant="body2">
                <RLink to="/ingreso">{"¿Ya tiene una cuenta? Inicie sesión."}</RLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
