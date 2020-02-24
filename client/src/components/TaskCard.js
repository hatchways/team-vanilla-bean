import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tag from "./Tag";

import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ index, task, props }) => {
  const classes = useStyles(props);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          className={snapshot.isdragging ? classes.dragged : classes.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isdragging}
        >
          <CardContent>
            <Tag color="green" />
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
    cursor: "move"
  }
});

export default TaskCard;
