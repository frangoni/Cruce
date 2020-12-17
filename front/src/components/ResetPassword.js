import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResetPassword, fetchSetNewPassword, userLogout, setError } from "../redux/actions/user";
import { useInput } from "../hooks/useInput";
import { useHistory, useRouteMatch } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
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

export default function ResetPassword() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userEmail = useInput("email");
    const userPassword = useInput("password");
    const [errorLoginFront, setErrorLoginFront] = useState({});

    const history = useHistory();
    const match = useRouteMatch()
    const statusLogin = useSelector((state) => state.animations.statusLogin);
    const isLoadingLogin = useSelector((state) => state.animations.isLoadingLogin);
    const errorBack = useSelector((state) => state.user.errorBack);


    const classInput = {
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
        if (match.params.uuid) {
            if (userPassword.value.length == 0) error = { ...error, password: true };
        }
        if (Object.keys(error).length) setErrorLoginFront(error);
        if (Object.keys(error).length == 0) {
            if (match.params.uuid) {
                dispatch(fetchSetNewPassword({
                    email: userEmail.value,
                    password: userPassword.value,
                    uuid: match.params.uuid

                }))
            }
            else {
                dispatch(
                    fetchResetPassword({
                        email: userEmail.value
                    })
                );
            }
        }
    };

    useEffect(() => {
        if (errorBack != "") {
            dispatch(setError(""));
        }
    }, [userEmail.value, userPassword.value]);

    useEffect(() => {
        if (statusLogin === 200) {
            dispatch(userLogout())
            if (match.params.uuid) {
                alert("Contraseña cambiada con exito!")

                history.push("/ingreso");
            }
            else {
                alert("Email para cambiar la Contraseña enviado")
                history.push("/");
            }
        }
    }, [statusLogin]);

    console.log("match", match)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cambiar la Contraseña
        </Typography>
                {isLoadingLogin ? <CircularProgress style={{ margin: "25px auto" }} /> : null}

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
                    {match.params.uuid ?
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
                        /> : null}
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Enviar
          </Button>

                </form>
            </div>
            <Box sx={8}></Box>
        </Container>
    );
}
