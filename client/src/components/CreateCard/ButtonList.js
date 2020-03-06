import React, { useContext } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import CardButton from "./CardButton";
import { CardContext } from "./cardContext";

const ButtonList = () => {
  const card = useContext(CardContext);
  const {
    handleOpenDeadline,
    handleOpenTag,
    handleOpenDelete,
    task,
    handleOpenAttachment
  } = card;

  return (
    <Grid item xs={2} container>
      <Grid item>
        <Typography color="secondary" variant="caption">
          ADD TO CARD:
        </Typography>
        <CardButton onClick={handleOpenTag}>Tag</CardButton>
        <CardButton onClick={handleOpenDeadline}>Deadline</CardButton>
        <CardButton onClick={handleOpenAttachment}>Attachment</CardButton>
        <CardButton>Cover</CardButton>
        <Box style={{ marginTop: "30%" }}>
          {task && <CardButton onClick={handleOpenDelete}>Delete</CardButton>}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ButtonList;
