import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const Tag = props => {
  const useStyles = makeStyles({
    tag: {
      margin: "10px 0",
      borderRadius: 10,
      height: 10,
      width: 50,
      backgroundColor: props.color || "red"
    }
  });

  const classes = useStyles(props);

  return <div className={classes.tag}></div>;
};

export default Tag;
