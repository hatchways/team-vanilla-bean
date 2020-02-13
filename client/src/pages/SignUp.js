import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography
} from "@material-ui/core";
import useStyles from "./SignInStyles";
import { Link } from "react-router-dom";

function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Grid container className={classes.root}>
      <Grid item xs={0} md={6} className={classes.image}></Grid>
      <Grid item xs={12} md={6}>
        <Container className={classes.paper}>
          <div>
            <Typography variant="h1" className={classes.title}>
              Sign up to Kanban
            </Typography>

            <form>
              <TextField
                variant="outlined"
                margin="normal"
                size="large"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel
                  }
                }}
                inputProps={{
                  required: true
                }}
                type="email"
                id="email"
                label="Enter Email"
                name="email"
                value={email}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
                onChange={e => setEmail(e.target.value)}
              />

              <TextField
                variant="outlined"
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel
                  }
                }}
                inputProps={{
                  required: true,
                  pattern: ".{6,}",
                  title: "Password must be 6 characters or longer "
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
                margin="normal"
                fullWidth
                name="password"
                label="Create password"
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={console.log(email, password)}
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
