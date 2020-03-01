import React, { Fragment } from "react";
import ColumnArea from "../components/ColumnArea";
import BlueNav from "../components/BlueNav";
import CardModal from "../components/CreateCard/Modal";
import TopNav from "../components/TopNav";
import { makeStyles } from "@material-ui/core/styles";

const DashBoard = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      margin: 0,
      padding: 0
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopNav />
      <BlueNav />
      <CardModal />
      <ColumnArea />
    </div>
  );
};

export default DashBoard;
