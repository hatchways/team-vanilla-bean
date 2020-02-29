import React, { useState, useEffect } from "react";
import { Container, Button, TextField, Grid, Typography } from "@material-ui/core";
import useStyles from "../themes/AuthStyles";
import { Link } from "react-router-dom";
import { login, loggedIn } from "../AuthService";
import { handleError } from "../utils/handleAlerts";

const SignIn = props => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(props);

  const redirect = () => {
    loggedIn() && props.history.push("/dashboard");
  };

  useEffect(() => {
    redirect();
  });

  const handleSignIn = e => {
    e.preventDefault();
    login("signin", email, password)
      .then(() => {
        redirect();
      })
      .catch(err => {
        handleError(err);
      });
  };

  return (
    <Grid container className={classes.root}>
      <Grid item md={6} className={classes.image}></Grid>
      <Grid item xs={12} md={6}>
        <Container className={classes.paper}>
          <div>
            <Typography variant='h1' className={classes.title}>
              Welcome back!
            </Typography>

            <form onSubmit={handleSignIn}>
              <TextField
                type='email'
                label='Enter Email'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant='outlined'
                margin='normal'
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    shrink: classes.shrink
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.notchedOutline
                  },
                  inputProps: {
                    required: true
                  }
                }}
              />

              <TextField
                type='password'
                label='Password'
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant='outlined'
                margin='normal'
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    shrink: classes.shrink
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.input,
                    input: classes.password,
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
                type='submit'
                variant='contained'
                color='primary'
                size='large'>
                Login
              </Button>
            </form>
          </div>
        </Container>

        <Container className={classes.footer}>
          <Typography paragraph variant='h2'>
            Don't have an account?
          </Typography>

          <Typography variant='h2'>
            <Link to='/signup'>Create</Link>
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignIn;
