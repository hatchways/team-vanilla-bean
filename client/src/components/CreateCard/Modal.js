import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Grid } from "@material-ui/core";
import Header from "./Header";
import Description from "./Description";
import Deadline from "./Deadline";
import Comment from "./Comment";
import ButtonList from "./ButtonList";
import authFetch from "../../AuthService";

const CardModal = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    // GET all card details and set to state
    console.log(description);
    console.log(title);
  });

  const onSave = () => {
    //POST or PUT to backend
  };

  const changeTitle = title => {
    setTitle(title);
  };

  const changeDescription = description => {
    setDescription(description);
  };

  const changeTag = tag => {
    setTag(tag);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: { paddingBottom: "3%" }
      }}
    >
      <DialogContent>
        <Grid container spacing={4}>
          <Header
            tag={"red"}
            title={props.selectedTask}
            changeTitle={changeTitle}
            changeTag={changeTag}
            column={props.column}
            handleClose={props.handleClose}
          />
          <Grid item xs={10} container spacing={4}>
            <Description
              initial={props.selectedTask}
              description={props.selectedTask}
              changeDescription={changeDescription}
            />
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
