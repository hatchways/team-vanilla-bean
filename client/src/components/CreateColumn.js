import React from "react";
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

import Button from "./BlueButton";

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState("");

  //TO DO: If no previous board set to Open
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //TODO: make API call
    handleClose();
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
        aria-labelledby="form-dialog-title"
        PaperProps={{
          className: classes.root
        }}
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <IconButton
            onClick={handleClose}
            className={classes.closeButton}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h1">Create new column</Typography>
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
            <Button type="submit">Create</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
