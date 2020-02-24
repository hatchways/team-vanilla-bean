import React from "react";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, IconButton, Grid, Typography } from "@material-ui/core";
import BlueButton from "../BlueButton";

const Comment = () => {
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
        />
        <BlueButton size="small" height="auto" width="auto" none>
          Save
        </BlueButton>
        <IconButton color="primary" aria-label="close">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Comment;
