import React from "react";
import ControlPoint from "@material-ui/icons/ControlPoint";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";

const CreateColumnButton = props => {
  const classes = useStyles(props);

  const addColumn = e => {
    console.log(e);
  };

  return (
    <Card className={classes.addColumn} onClick={e => addColumn(e)}>
      <CardContent>
        <ControlPoint points='0,100 50,00, 100,100' className={classes.plusIcon} />
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles({
  addColumn: {
    backgroundColor: "#D3D3D3",
    height: 200,
    width: "15rem",
    margin: "0 1rem",
    color: "black",
    textAlign: "left",
    lineHeight: "normal",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.2s",
    opacity: 0.5,
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
      color: "white"
    }
  },
  plusIcon: {
    fontSize: 100
  }
});

export default CreateColumnButton;
