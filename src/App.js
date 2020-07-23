import React, { useEffect, useState, Fragment } from 'react';
import { db } from './services/firebase';

//MUI Imports
import {ThemeProvider} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//Components
import Calculator from "./components/calculator";
import Result from './components/result';

import themeFile from "./util/themeFile";
import "./App.css"

const theme = themeFile;

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "20px "
  }
}));

function App() {
const [calculations, setCalculations] = useState([]);
const classes = useStyles();

useEffect(() => {
  async function getCalculations() {
    try{
    db.collection("calculations").orderBy('createdAt', 'desc').limit(10)
    .onSnapshot(querySnapshot => {
      var calcs = [];
      querySnapshot.forEach(doc => {
        calcs.push(doc.data().calculation);
      });
      setCalculations(calcs);
    });
  } catch(error){
    console.log(error.message);
  }
}

  getCalculations();
}, [calculations]);


return (
  <ThemeProvider theme={theme}>
    <Fragment>

      <Grid container justify="center">
        <Typography className={classes.title} variant="h2">Calculate</Typography>
      </Grid>

      <Grid container spacing={2}>
        <Grid item sm/>
        <Grid item sm><Calculator/></Grid>
        <Grid item sm/>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm/>
        <Grid item sm> 
        {calculations.map(calc => (
        <Result calc={calc}/>
        ))}
          </Grid>
        <Grid item sm/>
      </Grid>
    </Fragment>
    </ThemeProvider>
  );
}

export default App;
