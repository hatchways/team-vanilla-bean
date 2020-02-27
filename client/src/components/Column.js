import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContext } from "./CreateCard/cardContext";

import TaskCard from "./TaskCard";
//check how to use Cards in column data

//materialUi
import Typography from "@material-ui/core/Typography";
import Button from "./BlueButton";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CancelIcon from "@material-ui/icons/Cancel";
import CreateCard from "./CreateCard/Modal";

//Drag and Drop
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = props => {
  const classes = useStyles(props);
  const card = useContext(CardContext);
  const { handleCurrentTask } = card;

  const { column, tasks, createNew, index } = props;

  const [testSt, setTextSt] = useState({
    newTaskName: "",
    newColumnTitle: ""
  });
  const { newTaskName, newColumnTitle } = testSt;

  const onChange = e => {
    setTextSt({
      ...testSt,
      [e.target.name]: e.target.value
    });
  };

  const createNewColumn = e => {
    e.preventDefault();
    //Send newColumnTitle to create new column
  };

  const deleteColumn = e => {
    e.preventDefault();
    //Send newColumnTitle to create new column
  };

  if (createNew) {
    return (
      <Card className={classes.addColumn}>
        <CardContent>
          <TextField
            name="newColumnTitle"
            value={newColumnTitle}
            onChange={e => onChange(e)}
          >
            Enter column Name
          </TextField>
          <Button onChange={e => createNewColumn(e)} mini>
            Create New column
          </Button>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <div>
        <Draggable draggableId={column.id} index={index}>
          {provided => (
            <Card
              {...provided.draggableProps}
              ref={provided.innerRef}
              className={classes.root}
            >
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Typography
                    {...provided.dragHandleProps}
                    variant="h5"
                    className={classes.title}
                  >
                    {column.title}
                  </Typography>
                  <CancelIcon onClick={e => deleteColumn(e)} />
                </Grid>
                <Droppable droppableId={column.id} type="card">
                  {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map((task, index) => (
                        <TaskCard
                          columnId={column.id}
                          key={task.id}
                          task={task}
                          index={index}
                        />
                      ))}
                      {provided.placeholder}

                      <Button
                        mini
                        onClick={() => handleCurrentTask(null, column.id)}
                      >
                        Add a card
                      </Button>
                    </div>
                  )}
                </Droppable>
              </CardContent>
              <CreateCard />
            </Card>
          )}
        </Draggable>
      </div>
    );
  }
};

//Styling part
const useStyles = makeStyles({
  root: {
    backgroundColor: "#F4F6FF",
    minHeight: 50,
    width: "15rem",
    margin: "0 1rem",
    color: "black",
    textAlign: "left",
    lineHeight: "normal",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    textAlign: "left",
    marginBottom: 15
  },
  addColumn: {
    backgroundColor: "#F4F6FF",
    height: 200,
    width: "15rem",
    margin: "0 1rem",
    color: "black",
    textAlign: "left",
    lineHeight: "normal",
    display: "flex",
    flexDirection: "column"
  }
});

export default Column;
