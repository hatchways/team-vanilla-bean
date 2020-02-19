import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import NewColumnArea from "../components/newColumnArea/ColumnArea";

const DashBoard = props => {
  return (
    <DndProvider backend={Backend}>
      {/* <ColumnArea /> */}
      <NewColumnArea />
    </DndProvider>
  );
};

export default withTheme(DashBoard);
