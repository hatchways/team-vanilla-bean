import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography, TextField } from "@material-ui/core";
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
    text: {
      fontSize: 18
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
      <Grid item xs={12} container>
        <Grid item xs={1}>
          <AssignmentOutlinedIcon color="primary" fontSize="large" />
        </Grid>

        <Grid item xs={11}>
          <TextField
            placeholder="Add title..."
            defaultValue={props.title}
            autoFocus={!props.title}
            InputProps={{ classes: { input: classes.text } }}
            onChange={e => props.changeTitle(e.target.value)}
          />
          <Tag color={props.tag} card />
          <Typography variant="subtitle2" display="block" color="secondary">
            In list "{props.column}"
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
