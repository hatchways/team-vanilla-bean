import React, { useContext, useEffect, useState } from "react";
import Column from "./Column";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../userContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Redirect } from "react-router-dom";
import { handleError } from "../utils/handleAlerts";

//materia-ui
import LinearProgress from "@material-ui/core/LinearProgress";

const ColumnArea = props => {
  const classes = useStyles(props);
  const { value1 } = useContext(UserContext);
  let [taskState, setTaskState] = value1;
  const [loadingState, setLoadingState] = useState({
    loading: true,
    disableMove: false
  });
  const { loading } = loadingState;

  //download data for first access
  useEffect(() => {
    downLoadData();
  }, []);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    //Check if it is dropped to same column and same index
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    //For moving column
    if (type === "column") {
      const newColumnOrder = Array.from(taskState.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      setTaskState({ ...taskState, columnOrder: newColumnOrder });
      updateColumnIndex(taskState._id, newColumnOrder);
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
      updateTaskIndexInColumn(newColumn._id, taskOrder);
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

    moveTasksToOther(newStart, newFinish);
  };

  const fetchOption = (method, body) => {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };
  };

  const downLoadData = async () => {
    try {
      setLoadingState({ loading: true });
      let token = localStorage.getItem("token");
      if (!token) {
        return <Redirect to='/signin' />;
      }
      let body = { token };

      let response = await fetch("/dashboard/getDashBoard", fetchOption("post", body));
      let data = await response.json();
      setTaskState(data);
    } catch (err) {
      handleError(err);
    }
    setLoadingState({ loading: false });
  };

  const updateTaskIndexInColumn = async (columnId, taskOrder) => {
    try {
      let dashboardId = taskState._id;
      let body = { dashboardId: dashboardId, columnId, taskOrder };
      await fetch("/dashboard/updateTaskIndex", fetchOption("put", body));
    } catch (err) {
      handleError(err);
    }
  };

  const moveTasksToOther = async (newStart, newFinish) => {
    try {
      let body = {
        columnSourceId: newStart._id,
        columnSourceTasks: newStart.tasks,
        columnSourceTaskOrder: newStart.taskOrder,
        columnToSourceId: newFinish._id,
        columnToTasks: newFinish.tasks,
        columnToTaskOrder: newFinish.taskOrder,
        dashboardId: taskState._id
      };
      await fetch("/dashboard/moveTasksToOther", fetchOption("put", body));
    } catch (err) {
      handleError(err);
    }
  };

  const updateColumnIndex = async (dashboardId, columnOrder) => {
    try {
      let body = {
        dashboardId,
        columnOrder
      };
      await fetch("/dashboard/updateColumnIndex", fetchOption("put", body));
    } catch (err) {
      handleError(err);
    }
  };

  if (loading) {
    return <LinearProgress variant='query' />;
  } else {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-columns' direction='"horizontal' type='column'>
          {provided => (
            <div className={classes.root} {...provided.droppableProps} ref={provided.innerRef}>
              {taskState ? (
                taskState.columnOrder.map((columnId, index) => {
                  const column = taskState.columns[columnId];
                  let taskOrder = taskState.columns[columnId].taskOrder || [];
                  let tasks = taskOrder.map(task => {
                    return column.tasks[task];
                  });

                  return <Column key={column._id} column={column} tasks={tasks} index={index} />;
                })
              ) : (
                <h1>hello</h1>
              )}
              {provided.placeholder}
              <Column createNew />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center",
    width: "100%"
  }
});
export default ColumnArea;
