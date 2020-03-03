import React from "react";
import BlueNav from "../components/BlueNav";
import TopNav from "../components/TopNav";
import CssBaseline from "@material-ui/core/CssBaseline";

const Navbar = () => {
  return (
    <CssBaseline>
      <TopNav />
      <BlueNav />
    </CssBaseline>
  );
};

export default Navbar;
