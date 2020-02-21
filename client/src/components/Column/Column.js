import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TaskCard from "../TaskCard/TaskCard";
//check how to use Cards in column data

//materialUi
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

//Drag and Drop
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = props => {
  const classes = useStyles(props);
  const { column, tasks, createNew, index } = props;

  if (createNew) {
    return (
      <Card className={classes.addColumn}>
        <CardContent>
          <TextField>Enter column Name</TextField>
          <Button className={classes.btn} variant="contained" color="primary">
            Add a Card
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
                <Typography
                  {...provided.dragHandleProps}
                  variant="h5"
                  className={classes.title}
                >
                  {column.title}
                </Typography>
                <Droppable droppableId={column.id} type="card">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))}
                      {provided.placeholder}
                      <Button
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                      >
                        Add a Card
                      </Button>
                    </div>
                  )}
                </Droppable>
              </CardContent>
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
  btn: {
    marginTop: 20,
    marginBottom: 10,
    color: "white"
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
