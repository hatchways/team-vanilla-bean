import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography
} from "@material-ui/core";
import useStyles from "./AuthStyles";
import { Link } from "react-router-dom";

function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Grid container className={classes.root}>
      <Grid item md={6} className={classes.image}></Grid>
      <Grid item xs={12} md={6}>
        <Container className={classes.paper}>
          <div>
            <Typography variant="h1" className={classes.title}>
              Sign up to Kanban
            </Typography>

            <form>
              <TextField
                type="email"
                label="Enter Email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                inputProps={{
                  required: true
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />

              <TextField
                type="password"
                label="Create password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                inputProps={{
                  required: true,
                  pattern: ".{6,}",
                  title: "Password must be 6 characters or longer "
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />

              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Sign up
              </Button>
            </form>
          </div>
        </Container>
        <Container className={classes.footer}>
          <Typography paragraph variant="h2">
            Already have an account?
          </Typography>

          <Typography variant="h2">
            <Link to="/user/signin">Login</Link>
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
}

export default SignUp;
