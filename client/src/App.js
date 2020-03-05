import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./utils/routes";
import CardModal from "./components/CreateCard/Modal";
import { loggedin, loggedIn } from "./AuthService";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <PrivateRoute loggedIn={loggedIn()} path='/dashboards' component={DashBoard} />
        <Route
          path='/dashboards/:dashboardId/columns/:columnId/tasks/:taskId'
          render={props => <CardModal {...props} />}
        />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
