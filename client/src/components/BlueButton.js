import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const BlueButton = props => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      type="submit"
      variant="contained"
      color="primary"
      size="large"
    >
      {props.text}
    </Button>
  );
};
const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(4),
    color: "white",
    fontWeight: 600,
    textTransform: "none",
    width: "45%",
    height: theme.spacing(6)
  }
}));

export default BlueButton;
