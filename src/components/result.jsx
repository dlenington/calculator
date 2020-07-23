import React from 'react';

//MUI Imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    resultCard: {
        margin: "20px 0px 20px"
    }
}) 

export default function Result(props){
const classes = useStyles();
    return (
    <Card className={classes.resultCard}>
    <CardContent>
        <Typography>{props.calc}</Typography>
    </CardContent></Card>
    );
}
 
