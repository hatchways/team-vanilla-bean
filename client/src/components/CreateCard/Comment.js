import React, { useContext } from "react";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { TextField, Grid, Typography } from "@material-ui/core";
import BlueButton from "../BlueButton";
import { CardContext } from "./cardContext";

const Comment = () => {
  const card = useContext(CardContext);
  const { handleSubmit } = card;

  return (
    <Grid item container>
      <Grid item xs={1}>
        <ChatBubbleOutlineOutlinedIcon color="primary" />
      </Grid>

      <Grid item xs={11}>
        <Typography variant="h3" gutterBottom>
          Add comment:
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Write a comment..."
          multiline
          rows={2}
          fullWidth
          margin="normal"
        />
        <BlueButton mini onClick={handleSubmit}>
          Save
        </BlueButton>
      </Grid>
    </Grid>
  );
};

export default Comment;
