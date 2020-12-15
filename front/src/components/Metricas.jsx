import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {fetchMetricas} from "../redux/actions/metricas" 

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(4),
  },
}));

const useStylesCard = makeStyles({
    root: {
      width: "200px"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
      padding: 40,
      fontSize: 30
    },
    nums: {
        marginBottom: 12,
        padding: 40,
        fontSize: 30
      }
  });

export default function SpacingGrid() {
const [spacing, setSpacing] = React.useState(2);
const classes = useStyles();
const classesCard = useStylesCard();
const dispatch = useDispatch()
const {metricas} = useSelector(state => state.metricas)

useEffect(() => {dispatch(fetchMetricas())},[])

console.log("METRICASSSS",metricas)

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
      <div>
    <Grid container className={classes.root} spacing={2}>
      <Grid item m={12}>
        <Grid container justify="center" spacing={spacing}>
            <Grid item>
              <Card className={classes.root}>
      <CardContent>
        <Typography className={classesCard.title} color="textSecondary" gutterBottom>
          Número de pedidos despachados
        </Typography>
        <Typography className={classesCard.nums} color="textSecondary">
          {metricas.pedidosDespachados}
        </Typography>
      </CardContent>
    </Card>
            </Grid>
            <Grid item>
              <Card className={classes.root}>
      <CardContent>
        <Typography className={classesCard.title} color="textSecondary" gutterBottom>
          Demora promedio de envío
        </Typography>
        <Typography className={classesCard.pos} color="textSecondary">
        {(metricas.demoraPromedioDeEnvio/1000).toFixed(2)} <br/>minutos
        </Typography>
      </CardContent>
    </Card>
            </Grid>
            </Grid>
            </Grid>
            </Grid>

<Grid container className={classes.root} spacing={2}>
<Grid item m={12}>
  <Grid container justify="center" spacing={spacing}>
            <Grid item>
              <Card className={classes.root}>
      <CardContent>
        <Typography className={classesCard.title} color="textSecondary" gutterBottom>
        Número de pedidos devueltos
        </Typography>
        <Typography className={classesCard.nums} color="textSecondary">
          {metricas.pedidosDevueltos}
        </Typography>
      </CardContent>
    </Card>
            </Grid>
            <Grid item>
              <Card className={classes.root}>
      <CardContent>
        <Typography className={classesCard.title} color="textSecondary" gutterBottom>
          Demora promedio de ingreso/despacho 
        </Typography>
        <Typography className={classesCard.pos} color="textSecondary">
          {(metricas.demoraIngresoDespacho/1000).toFixed(2)} <br/>minutos
        </Typography>
      </CardContent>
    </Card>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
}
