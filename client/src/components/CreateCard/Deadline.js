import React from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const Description = () => {
  return (
    <Grid item container>
      <Grid item xs={1}>
        <AccessTimeIcon color="primary" />
      </Grid>

      <Grid item xs={11}>
        <Typography gutterBottom variant="h3">
          Deadline:
        </Typography>
        <Link variant="subtitle2" underline="always">
          March 10
        </Link>
      </Grid>
    </Grid>
  );
};

export default Description;
