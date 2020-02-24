import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateBoard from "./components/CreateBoard";
import CreateCard from "./components/CreateCard/Modal";
import CreateColumn from "./components/CreateColumn";

import PrivateRoute from "./utils/routes";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <PrivateRoute path="/dashboard" component={DashBoard} />
        <PrivateRoute path="/board" component={CreateBoard} />
        <PrivateRoute path="/card" component={CreateCard} />
        <PrivateRoute path="/column" component={CreateColumn} />

        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
