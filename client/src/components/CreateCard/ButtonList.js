import React, { useContext } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import CardButton from "./CardButton";

import { CardContext } from "./cardContext";

const ButtonList = () => {
  const card = useContext(CardContext);
  const { deadline, handleOpenTag, handleDeadlineChange } = card;

  const handleDeadlineClick = () => {
    if (!deadline) {
      handleDeadlineChange(Date.now());
    }
  };

  return (
    <Grid item xs={2} container>
      <Grid item>
        <Typography color="secondary" variant="caption">
          ADD TO CARD:
        </Typography>
        <CardButton onClick={handleOpenTag}>Tag</CardButton>
        <CardButton>Check-list</CardButton>
        <CardButton onClick={handleDeadlineClick}>Deadline</CardButton>
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
