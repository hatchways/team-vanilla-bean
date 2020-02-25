import React from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import BlueButton from "../BlueButton";

const Description = props => {
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
          defaultValue={props.description}
          onChange={e => props.changeDescription(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <BlueButton mini>Save</BlueButton>
      </Grid>
    </Grid>
  );
};

export default Description;
