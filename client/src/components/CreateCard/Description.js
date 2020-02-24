import React from "react";
import { Grid, IconButton, Typography, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import BlueButton from "../BlueButton";

const Description = () => {
  return (
    <Grid item container>
      <Grid item xs={1}>
        <MenuBookOutlinedIcon color="primary" />
      </Grid>

      <Grid item xs={11}>
        <Typography variant="h3" gutterBottom>
          Description:
        </Typography>
        <TextField
          placeholder="Add description..."
          variant="outlined"
          multiline
          rows={4}
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

export default Description;
