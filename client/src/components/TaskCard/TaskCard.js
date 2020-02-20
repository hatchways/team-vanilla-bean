import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Draggable } from "react-beautiful-dnd";
import { red } from "@material-ui/core/colors";

const TaskCard = ({ key, index, task, props }) => {
  const classes = useStyles(props);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          className={snapshot.isDragging ? classes.dragged : classes.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}>
          <CardContent>
            <div className={classes.tag}></div>
            <Typography>{task.content}</Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

//Styling part
const useStyles = makeStyles({
  root: {
    borderRadius: 5,
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move"
  },
  dragged: {
    borderRadius: 5,
    marginBottom: ".5rem",
    backgroundColor: "lightgreen",
    cursor: "move"
  },
  tag: {
    margin: "10px 0",
    borderRadius: 10,
    height: 10,
    width: 50,
    backgroundColor: "red"
  }
});

export default TaskCard;
