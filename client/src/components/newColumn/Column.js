import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "../newCard/Card";
//check how to use Cards in column data
// import { fakeData } from "../../dragAndDrop/fakeData";

//materialUi
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//Context APi
import { UserContext } from "../../userContext/userContext";

//
import { Droppable } from "react-beautiful-dnd";

const Column = props => {
  const classes = useStyles(props);
  const { columnName, cards, createNew, columnId } = props;
  const { value1 } = useContext(UserContext);
  const [taskState, setTaskState] = value1;

  const render = (
    <div className={classes.root}>
      <TextField>enter Text</TextField>
      <Button className={classes.btn} variant='contained' color='secondary'>
        Add new
      </Button>
    </div>
  );

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
      <Droppable droppableId={toString(columnId)}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={classes.root}>
            <Typography variant='h3'>{columnName}</Typography>
            {cards.map((card, index) => (
              <Card {...card} index={index} />
            ))}
            <Button className={classes.btn} variant='contained' color='secondary'>
              Add a Card
            </Button>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
};

//Styling part
const useStyles = makeStyles({
  root: {
    backgroundColor: "#F4F6FF",
    height: "100%",
    width: "12rem",
    margin: "0 2rem",
    color: "black",
    padding: "1rem",
    textAlign: "left",
    lineHeight: "normal",
    float: "left"
  }
});

export default Column;
