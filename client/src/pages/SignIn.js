import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Grid,
  Paper,
  Box,
  Typography
} from "@material-ui/core";
import useStyles from "./SignInStyles";

function SignIn() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={0} md={6} className={classes.image}></Grid>
      <Grid item xs={12} md={6}>
        <Container className={classes.paper}>
          <div>
            <Typography variant="h1" className={classes.title}>
              Welcome back!
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                className={classes.input}
                margin="normal"
                fullWidth
                InputProps={{
                  disableUnderline: true
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel
                  }
                }}
                id="email"
                label="Enter Email"
                name="email"
                autoFocus
              />

              <TextField
                className={classes.input}
                variant="outlined"
                InputProps={{
                  disableUnderline: true
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel
                  }
                }}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />

              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Login
              </Button>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default SignIn;
