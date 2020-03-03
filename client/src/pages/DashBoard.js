import React from "react";
import ColumnArea from "../components/ColumnArea";
import BlueNav from "../components/BlueNav";
import CardModal from "../components/CreateCard/Modal";
import TopNav from "../components/TopNav";
import CssBaseline from "@material-ui/core/CssBaseline";

const DashBoard = () => {
  return (
    <div>
      <CssBaseline>
        <TopNav />
        <BlueNav />
        <ColumnArea />
      </CssBaseline>
      <CardModal />
    </div>
  );
};

export default DashBoard;
