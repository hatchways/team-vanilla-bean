import React from "react";
import { Dialog, DialogContent, Grid } from "@material-ui/core";
import Header from "./Header";
import Description from "./Description";
import Deadline from "./Deadline";
import Comment from "./Comment";
import ButtonList from "./ButtonList";

const CardModal = () => {
  const [open, setOpen] = React.useState(true);

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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: { paddingBottom: "3%" }
      }}
    >
      <DialogContent>
        <Grid container spacing={4}>
          <Header handleClose={handleClose} />
          <Grid item xs={10} container spacing={4}>
            <Description />
            <Deadline />
            <Comment />
          </Grid>
          <ButtonList />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
