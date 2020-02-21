import React from "react";
import { Redirect, Route } from "react-router-dom";
import { loggedIn } from "../AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn() ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
);

export default PrivateRoute;
