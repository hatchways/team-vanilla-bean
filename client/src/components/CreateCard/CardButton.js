import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const CardButton = props => {
  const useStyles = makeStyles(() => ({
    button: {
      backgroundColor: "#F4F6FF",
      color: "#B5C0D9",
      marginBottom: "5%",
      textTransform: "none"
    }
  }));

  const classes = useStyles();
  return (
    <Button
      size="small"
      variant="contained"
      fullWidth
      className={classes.button}
      disableElevation
    >
      {props.children}
    </Button>
  );
};

export default CardButton;
