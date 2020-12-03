import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <div className="container">
      <div className="imagenes">
        <img className="logo" src={"./arbol.png"} />
        <img className="logo2" src={"./cruce.png"} />
        <div className="buttons">
          <Link to="/login">
            <Button variant="outlined" color="primary">
              <p>Ingresar</p>
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outlined" color="primary">
              <p>Registrarse</p>
            </Button>
          </Link>
        </div>
      </div>
      <div className="barco">
        <div className="barco2">
          <img src={"./barca.png"}></img>
        </div>
      </div>
    </div>
  );
};

export default Splash;
