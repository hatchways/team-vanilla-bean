import React, { Fragment } from "react";
import ColumnArea from "../components/ColumnArea";
import BlueNav from "../components/BlueNav";
import CardModal from "../components/CreateCard/Modal";
import TopNav from "../components/TopNav";
import Container from "@material-ui/core/Container";

const DashBoard = () => {
  return (
    <Fragment>
      <TopNav />
      <BlueNav />
      <CardModal />
      <Container maxWidth='xl'>
        <ColumnArea />
      </Container>
    </Fragment>
  );
};

export default DashBoard;
