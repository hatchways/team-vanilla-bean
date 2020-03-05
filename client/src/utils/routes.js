import React from "react";
import { Route } from "react-router-dom";
import { loggedIn } from "../AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn() ? (
        <Component {...props} />
      ) : (
        // <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
        props.history.replace({
          pathname: "/signin",
          search: `?toRedirect=${props.location.pathname}`,
          state: { from: props.location.pathname }
        })
      )
    }
  />
);

export default PrivateRoute;
