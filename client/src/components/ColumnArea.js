import React, { useContext, useEffect, useState } from "react";
import Column from "./Column";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../userContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

  //download data. might not need
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

    const startTaskOrder = Array.from(start.taskOrder);
    const startTaskIndex = source.index;
    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;

    let movedItemId;
    const newStartTasks = Object.keys(start.tasks).reduce((object, key) => {
      if (key !== startTaskOrder[startTaskIndex]) {
        object[key] = start.tasks[key];
      } else {
        movedItemId = startTaskOrder[startTaskIndex];
      }
      return object;
    }, {});

    startTaskOrder.splice(source.index, 1);
    const newStart = {
      ...start,
      taskOrder: startTaskOrder,
      tasks: newStartTasks
    };

    const finishTaskOrder = Array.from(finish.taskOrder);
    finishTaskOrder.splice(destination.index, 0, draggableId);

    let movedItem = taskState.columns[startColumn].tasks[movedItemId];
    let existedTasks = taskState.columns[endColumn].tasks;

    existedTasks[movedItem._id] = movedItem;

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

  const downLoadData = async () => {
    setLoadingState({ loading: true });
    let token = localStorage.getItem("token");

    let meme = { token: token };
    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(meme)
    };

    try {
      let response = await fetch("/dashboard/getDashBoard", options);
      let data = await response.json();

      setTaskState(data);
      setLoadingState({ loading: false });
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskIndexInColumn = async (columnId, taskOrder) => {
    try {
      let dashboardId = taskState._id;
      let body = { dashboardId: dashboardId, columnId, taskOrder };
      let options = {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      };
      let response = await fetch("/dashboard/updateTaskIndex", options);
      let data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const moveTasksToOther = async (newStart, newFinish) => {
    try {
      let columnSourceId = newStart._id;
      let columnSourceTasks = newStart.tasks;
      let columnSourceTaskOrder = newStart.taskOrder;
      let columnToSourceId = newFinish._id;
      let columnToTasks = newFinish.tasks;
      let columnToTaskOrder = newFinish.taskOrder;
      let dashboardId = taskState._id;

      let body = {
        columnSourceId,
        columnSourceTasks,
        columnSourceTaskOrder,
        columnToSourceId,
        columnToTasks,
        columnToTaskOrder,
        dashboardId
      };

      let options = {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      };
      let response = await fetch("/dashboard/moveTasksToOther", options);
      let data = await response.json();
      console.log("result", data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateColumnIndex = async (dashboardId, columnOrder) => {
    try {
      let body = {
        dashboardId,
        columnOrder
      };

      let options = {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      };
      let response = await fetch("/dashboard/updateColumnIndex", options);
      let data = await response.json();
      console.log("result", data);
    } catch (err) {
      console.log(err);
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
