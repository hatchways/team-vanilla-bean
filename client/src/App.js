import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path='/' component={LandingPage} />
        <Route exact path='/dashboard' component={DashBoard} />
        <Route path="/user/signin" component={SignIn} />
        <Route path="/user/signup" component={SignUp} />

      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
