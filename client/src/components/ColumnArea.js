import React, { useContext, useEffect, useState } from "react";
import Column from "./Column";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../userContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router";
import { authFetch } from "../AuthService";

import {
  updateTaskIndexInColumn,
  moveTasksToOther,
  updateColumnIndex
} from "../utils/handleUpdateTasks";

//Component
import CreateColumnButton from "../components/CreateColumnButton";
import CreateBoardColumn from "../components/CreateBoardColumn";

//materia-ui

const ColumnArea = props => {
  const classes = useStyles(props);
  const { value1 } = useContext(UserContext);
  let [taskState, setTaskState] = value1;
  const [open, setOpen] = useState(false);

  let dashboardId = taskState && taskState._id;

  useEffect(() => {
    authFetch(`/dashboards`)
      .then(res => {
        if (res.result) {
          setTaskState(res.result);
        }
      })
      .catch(() => {
        setOpen(true);
      });
  }, []);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    //Check if it is dropped to same column and same index
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //For moving column
    if (type === "column") {
      const newColumnOrder = Array.from(taskState.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setTaskState({ ...taskState, columnOrder: newColumnOrder });
      updateColumnIndex(dashboardId, newColumnOrder, draggableId);
      return;
    }

    const start = taskState.columns[source.droppableId];
    const finish = taskState.columns[destination.droppableId];

    //for the case task move around in same column
    if (start === finish) {
      const taskOrder = Array.from(start.taskOrder);
      taskOrder.splice(source.index, 1);
      taskOrder.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskOrder: taskOrder
      };

      setTaskState({
        ...taskState,
        columns: {
          ...taskState.columns,
          [newColumn._id]: newColumn
        }
      });
      updateTaskIndexInColumn(dashboardId, newColumn._id, taskOrder);
      return;
    }

    //Move task to other column
    const startTaskOrder = Array.from(start.taskOrder);
    const startTaskIndex = source.index;
    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;
    let movedTaskId;

    //Delete moved task from tasks in original column
    const newStartTasks = Object.keys(start.tasks).reduce((object, key) => {
      if (key !== startTaskOrder[startTaskIndex]) {
        object[key] = start.tasks[key];
      } else {
        movedTaskId = startTaskOrder[startTaskIndex];
      }
      return object;
    }, {});

    //update original column
    startTaskOrder.splice(source.index, 1);
    const newStart = {
      ...start,
      taskOrder: startTaskOrder,
      tasks: newStartTasks
    };

    //update destination column
    const finishTaskOrder = Array.from(finish.taskOrder);
    finishTaskOrder.splice(destination.index, 0, draggableId);

    let movedTask = taskState.columns[startColumn].tasks[movedTaskId];
    let existedTasks = taskState.columns[endColumn].tasks;

    existedTasks[movedTask._id] = movedTask;

    //new destination column
    const newFinish = {
      ...finish,
      taskOrder: finishTaskOrder,
      tasks: { ...existedTasks }
    };

    setTaskState({
      ...taskState,
      columns: {
        ...taskState.columns,
        [newStart._id]: newStart,
        [newFinish._id]: newFinish
      }
    });

    moveTasksToOther(dashboardId, newStart, newFinish);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!taskState) {
    return (
      <CreateBoardColumn open={open} handleClose={handleClose} dashboard />
    );
  } else {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction='"horizontal'
          type="column"
        >
          {provided => (
            <div
              className={classes.root}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <CreateColumnButton position="left" />
              {taskState ? (
                taskState.columnOrder.map((columnId, index) => {
                  const column = taskState.columns[columnId];
                  let taskOrder = taskState.columns[columnId].taskOrder || [];
                  let tasks = taskOrder.map(task => {
                    return column.tasks[task];
                  });

                  return (
                    <div className={classes.columns}>
                      <Column
                        key={column._id}
                        column={column}
                        tasks={tasks}
                        index={index}
                      />
                    </div>
                  );
                })
              ) : (
                <CreateColumnButton position="right" />
              )}
              <CreateColumnButton position="right" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    overflow: "auto",
    minHeight: "100vh"
  },
  columns: {
    userSelect: "none",
    padding: " 4 * 2"
  }
}));

export default withRouter(ColumnArea);
