import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <div className="container">
      <div className="logo">
        <img className="logo2" src={"./cruce.svg"} />
      </div>
      <div className="barco2">
        <img src={"./barca.png"}></img>
      </div>
      <div className="buttons">
        <Link className="boton" to="/ingreso">
          <Button variant="contained" color="primary">
            Ingresar
          </Button>
        </Link>
        <Link className="boton2" to="/registro">
          <Button variant="contained" color="primary">
            Registrarse
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Splash;
