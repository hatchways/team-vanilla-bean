import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CardButton from "./CardButton";

const Comment = () => {
  return (
    <Grid item xs={2} style={{ marginLeft: "5%" }} container>
      <Grid item>
        <Typography color="secondary" variant="caption">
          ADD TO CARD:
        </Typography>
        <CardButton>Tag</CardButton>
        <CardButton>Check-list</CardButton>
        <CardButton>Deadline</CardButton>
        <CardButton>Attachment</CardButton>
        <CardButton>Cover</CardButton>
      </Grid>
      <Grid item>
        <Typography color="secondary" variant="caption">
          ACTIONS:
        </Typography>
        <CardButton>Move</CardButton>
        <CardButton>Copy</CardButton>
        <CardButton>Share</CardButton>
        <CardButton>Delete</CardButton>
      </Grid>
    </Grid>
  );
};

export default Comment;
