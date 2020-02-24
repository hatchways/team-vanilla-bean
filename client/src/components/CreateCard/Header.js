import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import Tag from "../Tag";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import CloseIcon from "@material-ui/icons/Close";

const Header = props => {
  const useStyles = makeStyles(theme => ({
    header: {
      borderBottom: "2px rgba(117,156,252, 0.1) solid"
    },
    closeButton: {
      position: "absolute",
      top: 1,
      right: 1,
      color: theme.palette.grey[500]
    },
    icon: {
      float: "left",
      paddingRight: "2%"
    }
  }));

  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.header}>
      <IconButton
        onClick={props.handleClose}
        className={classes.closeButton}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      <Grid item xs={5}>
        <AssignmentOutlinedIcon
          className={classes.icon}
          color="primary"
          fontSize="large"
        />
        <Typography variant="h2" display="inline">
          Midterm exam
        </Typography>
        <Tag color="red" card />
        <Typography display="block" color="secondary" variant="subtitle2">
          In list "Math"
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
