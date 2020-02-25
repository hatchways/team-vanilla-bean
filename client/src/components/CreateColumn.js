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
import BlueButton from "../components/BlueButton";

import { addColumn } from "../utils/handleUpdateTasks";
import { UserContext } from "../userContext";

export default function FormDialog(props) {
  const { open, handleClose } = props;
  const [title, setTitle] = useState("");
  const { value1 } = useContext(UserContext);
  let [taskState, setTaskState] = value1;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let dashboardId = taskState._id;
      let response = await addColumn(dashboardId, title);
      console.log(response);

      setTaskState(response);
    } catch (err) {
      handleClose(err);
    }
    handleClose(false);
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
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        PaperProps={{
          className: classes.root
        }}>
        <DialogTitle disableTypography id='form-dialog-title'>
          <IconButton onClick={handleClose} className={classes.closeButton} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h1'>Create Column</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Add Title'
              variant='outlined'
              margin='normal'
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              fullWidth></TextField>
            <BlueButton type='submit'>Create</BlueButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
