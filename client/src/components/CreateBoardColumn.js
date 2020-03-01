import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import BlueButton from "./BlueButton";

import { addColumn, addDashboard } from "../utils/handleUpdateTasks";
import { UserContext } from "../userContext";
import { handleError } from "../utils/handleAlerts";

import { withRouter } from "react-router-dom";

const FormDialog = props => {
  const { open, handleClose, position, dashboard } = props;
  const [title, setTitle] = useState("");
  const { value1 } = useContext(UserContext);
  let [taskState, setTaskState] = value1;
  let dashboardId = taskState && taskState._id;

  const handleSubmit = e => {
    e.preventDefault();
    if (dashboard) {
      addDashboard(title, res => {
        setTaskState(res);
        setTitle("");
        handleClose(false);
        console.log(res);
      });
    } else {
      try {
        addColumn(dashboardId, title, position, res => {
          setTaskState(res);
          setTitle("");
          handleClose(false);
        });
      } catch (err) {
        handleError(err);
      }
    }
  };

  const useStyles = makeStyles(theme => ({
    root: {
      padding: "3%",
      textAlign: "center"
    },
    closeButton: {
      position: "absolute",
      top: 1,
      right: 1,
      color: theme.palette.grey[500]
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={dashboard ? null : handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          className: classes.root
        }}
      >
        <DialogTitle disableTypography id="form-dialog-title">
          {dashboard ? null : (
            <IconButton
              onClose={handleClose}
              className={classes.closeButton}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          )}
          <Typography variant="h1">
            {dashboard ? "Create Board" : "Create Column"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Add Title"
              variant="outlined"
              margin="normal"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              fullWidth
            ></TextField>
            <BlueButton type="submit">Create</BlueButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withRouter(FormDialog);
