import React, { Fragment } from "react";
import ColumnArea from "../components/ColumnArea";
import BlueNav from "../components/BlueNav";
import CardModal from "../components/CreateCard/Modal";

const DashBoard = () => {
  return (
    <Fragment>
      <BlueNav />
      <CardModal />
      <ColumnArea />;
    </Fragment>
  );
};

export default DashBoard;
