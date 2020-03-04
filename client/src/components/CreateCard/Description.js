import React, { useContext, useState } from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import BlueButton from "../BlueButton";
import { useHistory, useLocation } from "react-router-dom";

import { CardContext } from "./cardContext";

const Description = () => {
  const card = useContext(CardContext);
  const { description, handleDescriptionChange, handleSubmit } = card;
  const history = useHistory();

  const path = useLocation().pathname;
  const [calendarView] = useState(path.includes("/calendar") ? true : false);

  const submitCard = () => {
    handleSubmit();
    if (calendarView) {
      history.push("/calendar");
    } else {
      history.push("/dashboards");
    }
  };

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
          value={description}
          onChange={e => handleDescriptionChange(e)}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <BlueButton onClick={submitCard} mini>
          Save
        </BlueButton>
      </Grid>
    </Grid>
  );
};

export default Description;
