import React, { useContext } from "react";
import Column from "../newColumn/Column";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../userContext/userContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ColumnArea = props => {
  const classes = useStyles(props);
  const { value1 } = useContext(UserContext);
  let [taskState, setTaskState] = value1;

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = taskState.columns[source.droppableId];

    const finish = taskState.columns[destination.droppableId];

    //for the case card move around in same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setTaskState({
        ...taskState,
        columns: {
          ...taskState.columns,
          [newColumn.id]: newColumn
        }
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    setTaskState({
      ...taskState,
      columns: { ...taskState.columns, [newStart.id]: newStart, [newFinish.id]: newFinish }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='"horizontal' type='column'>
        {provided =>
          taskState.columnOrder.map((columnId, index) => {
            const column = taskState.columns[columnId];
            const tasks = column.taskIds.map(taskId => taskState.tasks[taskId]);
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  className={classes.root}
                />
                {provided.placeholder}
              </div>
            );
          })
        }
      </Droppable>
    </DragDropContext>
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
