import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Draggable } from "react-beautiful-dnd";

const Card = ({ text, index, cardId, props }) => {
  const classes = useStyles(props);
  const ref = useRef(null);
  console.log(index, cardId);

  return (
    <Draggable draggableId={String(cardId)} index={index}>
      {provided => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div ref={ref} className={classes.root}>
            {text}
          </div>
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
  }
});

export default Card;
