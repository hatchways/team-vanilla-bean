import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "./BlueButton";
import { makeStyles } from "@material-ui/core/styles";

const CreateBoard = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog
        open={true}
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            id="name"
            label="Add Title"
            type="text"
          />
        </DialogContent>
        <Button className={classes.button} text="Create" />
        {/* <button>Create</button> */}
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  dialog: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    height: "600px"
  }
}));

export default CreateBoard;
