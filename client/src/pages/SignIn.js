import React, { useState, useContext, useEffect } from "react";
import { Container, TextField, Grid, Typography } from "@material-ui/core";
import Button from "../components/BlueButton";
import useStyles from "../themes/AuthStyles";
import { Link } from "react-router-dom";
import {
  login,
  loggedIn,
  getCurrentBoard,
  setCurrentBoard
} from "../AuthService";
import { handleError } from "../utils/handleAlerts";
import { UserContext } from "../userContext";
import { getDashboardTitles } from "../utils/handleUpdateTasks";

const SignIn = props => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dashboardTitles } = useContext(UserContext);
  let dashboardId = getCurrentBoard() || "createboard";

  let [, setDbTitles] = dashboardTitles;
  const redirect = () => {
    loggedIn() && props.history.push(`/dashboards/${dashboardId}`);
  };

  useEffect(() => {
    redirect();
  });

  const handleSignIn = e => {
    e.preventDefault();
    login("signin", email, password)
      .then(res => {
        if (res.dashboardIds.length === 0) {
          setCurrentBoard("createboard");
        }
        getDashboardTitles(res => {
          setDbTitles(res);
          for (const key in res) {
            if (res[key]._id !== dashboardId) {
              setCurrentBoard(res[0]._id);
            }
          }
        });
      })
      .then(redirect())
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
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
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
              <Button>Login</Button>
            </form>
          </div>
        </Container>

        <Container className={classes.footer}>
          <Typography paragraph variant="h3">
            Don't have an account?
          </Typography>

          <Typography variant="h3">
            <Link to="/signup">Create</Link>
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignIn;
