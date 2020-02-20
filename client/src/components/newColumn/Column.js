import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "../newCard/Card";
//check how to use Cards in column data

//materialUi
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//Context APi
import { UserContext } from "../../userContext/userContext";

//Drag and Drop
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = props => {
  const classes = useStyles(props);
  const { column, tasks, createNew, key, index } = props;
  const { value1 } = useContext(UserContext);
  const [taskState, setTaskState] = value1;

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
      <Draggable draggableId={column.id} index={index}>
        {provided => (
          <div {...provided.draggableProps} ref={provided.innerRef} className={classes.root}>
            <Typography {...provided.dragHandleProps} variant='h3'>
              {column.title}
            </Typography>
            <Droppable droppableId={column.id} type='card'>
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => (
                    <Card key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Button className={classes.btn} variant='contained' color='secondary'>
              Add a Card
            </Button>
          </div>
        )}
      </Draggable>
    );
  }
};

//Styling part
const useStyles = makeStyles({
  root: {
    // display: "flex",
    // flexDirection: "column",
    backgroundColor: "#F4F6FF",
    minHeight: 300,
    width: "12rem",
    margin: "0 2rem",
    color: "black",
    padding: "1rem",
    textAlign: "left",
    lineHeight: "normal"
  },
  cardList: {
    flexGrow: 1
  }
});

export default Column;
