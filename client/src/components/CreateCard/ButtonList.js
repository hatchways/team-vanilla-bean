import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import CardButton from "./CardButton";

const ButtonList = () => {
  return (
    <Grid item xs={2} container>
      <Grid item>
        <Typography color="secondary" variant="caption">
          ADD TO CARD:
        </Typography>
        <CardButton>Tag</CardButton>
        <CardButton>Check-list</CardButton>
        <CardButton>Deadline</CardButton>
        <CardButton>Attachment</CardButton>
        <CardButton>Cover</CardButton>
        <Box style={{ marginTop: "30%" }}>
          <Typography color="secondary" variant="caption">
            ACTIONS:
          </Typography>
          <CardButton>Copy</CardButton>
          <CardButton>Share</CardButton>
          <CardButton>Delete</CardButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ButtonList;
