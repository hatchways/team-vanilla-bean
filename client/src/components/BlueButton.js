import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const BlueButton = props => {
  const useStyles = makeStyles(theme => ({
    button: {
      marginTop: props.none ? 0 : theme.spacing(4),
      color: "white",
      textTransform: "none",
      width: props.width || "45%",
      height: props.height || theme.spacing(6)
    }
  }));
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      type="submit"
      variant="contained"
      color="primary"
      size={props.size ? props.size : "large"}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default BlueButton;
