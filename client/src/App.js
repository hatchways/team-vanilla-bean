import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignIn from "./pages/SignIn";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route path="/user/signin" component={SignIn} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
