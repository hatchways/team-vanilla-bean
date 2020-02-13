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
import AuthService from "../AuthService";

function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Auth = new AuthService();

  const handleSignIn = e => {
    e.preventDefault();
    Auth.login("signin", email, password)
      .then(() => {
        //redirect to home
        props.history.push("/");
      })
      .catch(err => {
        //TODO: retrieve and display error message
      });
  };

  return (
    <Grid container className={classes.root}>
      <Grid item md={6} className={classes.image}></Grid>
      <Grid item xs={12} md={6}>
        <Container className={classes.paper}>
          <div>
            <Typography variant="h1" className={classes.title}>
              Welcome back!
            </Typography>

            <form onSubmit={handleSignIn}>
              <TextField
                type="email"
                label="Enter Email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  },
                  inputProps: {
                    required: true
                  }
                }}
              />

              <TextField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  },
                  inputProps: {
                    required: true,
                    pattern: ".{6,}",
                    title: "Password must be 6 characters or longer "
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
                Login
              </Button>
            </form>
          </div>
        </Container>

        <Container className={classes.footer}>
          <Typography paragraph variant="h2">
            Don't have an account?
          </Typography>

          <Typography variant="h2">
            <Link to="/user/signup">Create</Link>
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
}

export default SignIn;
