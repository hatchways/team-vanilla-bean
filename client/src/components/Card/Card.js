import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ key, index, task, props }) => {
  const classes = useStyles(props);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? classes.dragged : classes.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}>
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

//Styling part
const useStyles = makeStyles({
  root: {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move"
  },
  dragged: {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "lightgreen",
    cursor: "move"
  }
});

export default Card;
