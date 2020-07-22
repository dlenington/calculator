import React, { useState, Fragment, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { db } from '../services/firebase';

import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  button: {
   margin: "5px 5px 5px 0px"
  },
  displayField: {
    margin: "0px 0px 10px"
  },
}))


function Calculator() {
  
  const [currentCalculation, setCurrentCalculation] = useState([]);
  const [display, setDisplay] = useState('');
  const [previousKey, setPreviousKey] = useState('');
  const [firstValue, setFirstValue] = useState('');
  const [operator, setOperator] = useState('');
  
  const classes = useStyles();
  
  useEffect(() => {
    if(currentCalculation.includes("="))
      submit();
  }, [currentCalculation]);
const calculate = (num1, operator, num2) => {
  if(operator === 'add'){
    console.log("entered1");
      addToCurrentCalculation(num1, '+', num2);
      // setCurrentCalculation(oldCalcs => [...oldCalcs, num1, "+", num2]);
      return parseFloat(num1) + parseFloat(num2)
  } else if ( operator === 'subtract') {
    console.log("entered2");
    addToCurrentCalculation(num1, '-', num2);
    return parseFloat(num1) - parseFloat(num2)
  } else if ( operator === 'multiply') {
    console.log("entered3");
    addToCurrentCalculation(num1, 'x', num2);
    return parseFloat(num1) * parseFloat(num2);
  } else {
    console.log("entered3");
    addToCurrentCalculation(num1, '/', num2);
    return parseFloat(num1) / parseFloat(num2);
  
  }
}

const addToCurrentCalculation = (num1, operator, num2) => {
  console.log("addToCurrentCalculation " + num1 + operator + num2);
  var isFirstExpression = currentCalculation.length === 0;

  // setCurrentCalculation([...currentCalculation, num1, operator, num2]);

  if(isFirstExpression){
    console.log("isFirstExpression")
    
    setCurrentCalculation(oldCalculation => ([ ...oldCalculation, num1, operator, num2]));
  
    console.log("currentCalculation" + JSON.stringify(currentCalculation));
  } else {
    console.log("isFirstExpression");
    setCurrentCalculation(oldCalculation => ([...oldCalculation, operator, num2]));
    console.log("currentCalculation" + JSON.stringify(currentCalculation));
  }
  }

const submit = () => {
  console.log("SUBMIT CALLED");
  if(currentCalculation.length === 0)
  return;

  async function handleSubmit(){
      await db.collection("calculations").add({
        calculation: currentCalculation.join(' ').trim(),
        createdAt: new Date().toISOString()
      })
      .then(docRef => {
        console.log("Document added with ID:" + docRef.id);
        setCurrentCalculation([]);
      })  
    .catch(error => {
      console.error("Error adding document to database: " + error);
    });
  }
  
  handleSubmit();
}
  
const handleClick = (event) => {
  const key = event.target;
  const action = event.currentTarget.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = display;

  if(!action) { 
    setDisplay(displayedNum === '0' || previousKey === 'operator' ? keyContent : display + keyContent);
    setPreviousKey('number');
  }
  
  if( action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      if(firstValue && operator && previousKey !== 'operator') 
      { 
        let calcValue = calculate(firstValue, operator, display);
        setDisplay(calcValue);
        setFirstValue(calcValue);
      } else {
        setFirstValue(display);
      }
      
    setPreviousKey('operator');
    setOperator(action);
  }
     
  if(action === 'decimal') {
    if(!display.includes('.'))
      setDisplay(display + '.');
    else if(previousKey === 'operator')
      setDisplay('0.');

    setPreviousKey('decimal');
}

  if(action === 'clear') {
  setFirstValue('');
  setDisplay('');
  setPreviousKey('clear');
  setCurrentCalculation([]);
}

  if(action === 'calculate') {
  //   var result = '';
    
  //   if(firstValue) {
  //     if(previousKey === 'calculate') setFirstValue(display);
  //  console.log("entered1");
  //     result = calculate(firstValue, operator, display);
  //     setDisplay(result);
  //     addToCurrentCalculation(null, "=", result);
  //     // submit();
  //     setFirstValue(display); 
      
  //   } else {
  //     console.log("entered2");
  //     result = calculate(firstValue, operator, display);
  //     addToCurrentCalculation(null, "=", result);
  //     // submit();
  //     setDisplay(result);
  //   }
  if(firstValue) {
    if(previousKey === 'calculate') {
      setFirstValue(display);
    }
    let result = calculate(firstValue, operator, display);
    addToCurrentCalculation(null, "=", result);
    // setCurrentCalculation(oldCalcs => [...oldCalcs, null, "=", result]);
    setDisplay(result);
    console.log("currentCalculation " + JSON.stringify(currentCalculation));
    // submit();
    // setCurrentCalculation([]);
  }

    setPreviousKey('calculate');
}
}

  return ( 
    <Fragment>
    <TextField className={classes.displayField} value={display}>
    
    </TextField>
    <Grid class="calc-keys">
      <Grid item> 
      <Button className={classes.button} data-action="add" onClick={handleClick} variant="contained" color="secondary">+</Button>
      <Button className={classes.button} data-action="subtract" onClick={handleClick} variant="contained" color="secondary">-</Button>
      <Button className={classes.button} data-action="multiply" onClick={handleClick} variant="contained" color="secondary">x</Button>
      <Button className={classes.button} data-action="divide" onClick={handleClick} variant="contained" color="secondary">÷</Button>
      </Grid>
      <Grid item> 
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>7</Button>
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>8</Button>
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>9</Button>
      </Grid>
      <Grid item sm>
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>4</Button>
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>5</Button>
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>6</Button>
      </Grid>
      <Grid item sm>
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>1</Button>
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>2</Button>
      <Button className={classes.button} color="primary" variant="contained" onClick={handleClick}>3</Button>
      </Grid>
      <Grid item sm> 
      <Button className={classes.button} onClick={handleClick} variant="contained" color="primary">0</Button>
      <Button className={classes.button} data-action="decimal" onClick={handleClick} variant="contained" color="secondary">.</Button>
      <Button className={classes.button} data-action="clear" onClick={handleClick} variant="contained" color="secondary" variant="contained" color="secondary">AC</Button>
      <Button className={classes.button} data-action="calculate" onClick={handleClick} variant="contained" color="secondary">=</Button>
      </Grid>
    </Grid>
    </Fragment>
   );
}
 
export default Calculator;


