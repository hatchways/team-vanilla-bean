import React, { useRef, useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "../../dragAndDrop/ItemTypes";
import update from "immutability-helper";
import Card from "../card/Card";
import { fakeData } from "../../dragAndDrop/fakeData";

const Column = props => {
  const classes = useStyles(props);
  const ref = useRef(null);
  const { index, id, text, moveColumn } = props;

  const [, drag] = useDrag({
    item: { index, id, text, type: ItemTypes.COLUMN },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      console.log("clientOffset", clientOffset);

      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      // Time to actually perform the action
      moveColumn(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });
  drag(drop(ref));

  //   const isActive = canDrop && isOver;
  const [data, setData] = useState(fakeData);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [data]
  );

  const renderCard = (card, index) => {
    return <Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} />;
  };
  return (
    <div ref={ref} className={id === 11 ? classes.root : classes.test1}>
      {data.map((card, index) => renderCard(card, index))}
    </div>
  );
};

//Styling part
const useStyles = makeStyles({
  root: {
    backgroundColor: "blue",
    height: 200,
    width: "12rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    color: "red",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left"
  },
  test1: {
    backgroundColor: "yellow",
    height: 200,
    width: "12rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    color: "red",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left"
  }
});

export default Column;
