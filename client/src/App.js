import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import DashBoard from "./pages/DashBoard";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path='/' component={LandingPage} />
        <Route exact path='/dashboard' component={DashBoard} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
