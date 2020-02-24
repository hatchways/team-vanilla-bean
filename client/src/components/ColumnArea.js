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
      columns: {
        ...taskState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
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
      console.log(data);

      setTaskState(data);
      setLoadingState({ loading: false });
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
