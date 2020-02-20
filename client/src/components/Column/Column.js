import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "../Card/Card";
//check how to use Cards in column data

//materialUi
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//Drag and Drop
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = props => {
  const classes = useStyles(props);
  const { column, tasks, createNew, index } = props;

  if (createNew) {
    return (
      <div className={classes.root}>
        <TextField>Enter column Name</TextField>
        <Button className={classes.btn} variant='contained' color='secondary'>
          Add a Card
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Draggable draggableId={column.id} index={index}>
          {provided => (
            <div {...provided.draggableProps} ref={provided.innerRef}>
              <Typography {...provided.dragHandleProps} variant='h5' className={classes.title}>
                {column.title}
              </Typography>
              <Droppable droppableId={column.id} type='card'>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    className={classes.root}
                    ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                      <Card key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                    <Button className={classes.btn} variant='contained' color='secondary'>
                      Add a Card
                    </Button>
                  </div>
                )}
              </Droppable>
            </div>
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
    width: "12rem",
    margin: "0 2rem",
    color: "black",
    padding: 10,
    textAlign: "left",
    lineHeight: "normal",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    textAlign: "center"
  },
  btn: {
    marginTop: 20,
    marginBottom: 10
  }
});

export default Column;
