import React, { useCallback, useContext } from "react";
import Column from "../newColumn/Column";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../userContext/userContext";
import { DragDropContext } from "react-beautiful-dnd";

const ColumnArea = props => {
  const classes = useStyles(props);
  const { value1 } = useContext(UserContext);
  const [taskState, setTaskState] = value1;

  const onDragEnd = () => {
    //ToDo reordering logic
  };

  return (
    <div className={classes.root}>
      <DragDropContext>
        {taskState.map((column, index) => (
          <Column
            key={column.columnId}
            index={index}
            columnId={column.columnId}
            columnName={column.columnName}
            cards={column.cards}
          />
        ))}
      </DragDropContext>
      <Column createNew />
    </div>
  );
};
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignContent: "center",
    width: "100%"
  }
});
export default ColumnArea;
