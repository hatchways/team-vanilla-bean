import React, { useContext } from "react";
import { Dialog, DialogContent, Grid } from "@material-ui/core";
import Header from "./Header";
import Description from "./Description";
import Deadline from "./Deadline";
import Comment from "./Comment";
import ButtonList from "./ButtonList";
import { CardContext } from "./cardContext";

const CardModal = () => {
  const card = useContext(CardContext);
  const { openCard, handleCloseCard, deadline } = card;

  return (
    <Dialog
      open={openCard}
      onClose={handleCloseCard}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: { paddingBottom: "3%", height: deadline && "600px" }
      }}
    >
      <DialogContent>
        <Grid container spacing={4}>
          <Header />
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
