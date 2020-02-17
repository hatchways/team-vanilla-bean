import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import ColumnArea from "../components/columnArea/ColumnArea";

const DashBoard = props => {
  return (
    <DndProvider backend={Backend}>
      <ColumnArea />
    </DndProvider>
  );
};

export default withTheme(DashBoard);
