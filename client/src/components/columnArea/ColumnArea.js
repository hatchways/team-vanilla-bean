import React, { useState, useCallback } from "react";
import Column from "../column/Column";
import { fakeDataColumn } from "../../dragAndDrop/fakeData";
import { makeStyles } from "@material-ui/core/styles";
import update from "immutability-helper";

const ColumnArea = props => {
  const classes = useStyles(props);
  const [columnData, setColumnData] = useState(fakeDataColumn);

  const moveColumn = useCallback(
    (dragIndex, hoverIndex) => {
      const dragColumn = columnData[dragIndex];
      console.log(dragColumn);
      setColumnData(
        update(columnData, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragColumn]
          ]
        })
      );
    },
    [columnData]
  );

  const renderColumn = (column, index) => {
    return (
      <Column
        key={column.id}
        index={index}
        id={column.id}
        text={column.text}
        moveColumn={moveColumn}
      />
    );
  };

  return (
    <div className={classes.root}>
      {columnData.map((column, index) => renderColumn(column, index))}
    </div>
  );
};
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    width: "100%"
  }
});
export default ColumnArea;
