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
    loading: true
  });
  const { loading } = loadingState;

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

      //Need update Column position later
      return;
    }

    const start = taskState.columns[source.droppableId];
    const finish = taskState.columns[destination.droppableId];

    //for the case task move around in same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskOrder);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskOrder: newTaskIds
      };
      setTaskState({
        ...taskState,
        columns: {
          ...taskState.columns,
          [newColumn._id]: newColumn
        }
      });

      //need save newState to db
      return;
    }

    const startTaskOrder = Array.from(start.taskOrder);
    const startTaskIndex = source.index;
    const startColumn = source.droppableId;
    const endTaskIndex = destination.index;
    const endColumn = destination.droppableId;

    // console.log(startTaskIndex);
    // console.log(startColumn);
    // console.log(endTaskIndex);
    // console.log(endColumn);

    // console.log(startTaskOrder[startTaskIndex]);

    let movedItemId;
    const newStartTasks = Object.keys(start.tasks).reduce((object, key) => {
      if (key !== startTaskOrder[startTaskIndex]) {
        object[key] = start.tasks[key];
      } else {
        movedItemId = startTaskOrder[startTaskIndex];
      }
      return object;
    }, {});
    console.log(newStartTasks);

    startTaskOrder.splice(source.index, 1);
    const newStart = {
      ...start,
      taskOrder: startTaskOrder,
      tasks: newStartTasks
    };

    console.log("newStart", newStart);

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

  console.log("123", taskState);

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
