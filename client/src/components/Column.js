import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContext } from "./CreateCard/cardContext";

import TaskCard from "./TaskCard";
import Button from "./BlueButton";
//check how to use Cards in column data

//materialUi
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CancelIcon from "@material-ui/icons/Cancel";
import { useHistory } from "react-router-dom";

//Drag and Drop
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = props => {
  const classes = useStyles(props);
  const { column, tasks, index } = props;

  const card = useContext(CardContext);
  const { handleCurrentTask } = card;
  const history = useHistory();

  const deleteColumn = e => {
    e.preventDefault();
    //Todo create delete column function
  };

  return (
    <Draggable draggableId={column._id} index={index}>
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
              {...provided.dragHandleProps}
            >
              <Typography variant="h5" className={classes.title}>
                {column.title}
              </Typography>
              <CancelIcon
                className={classes.cancel}
                onClick={e => deleteColumn(e)}
              />
            </Grid>
            <Droppable droppableId={column._id} type="card">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      index={index}
                      columnId={column._id}
                    />
                  ))}
                  {provided.placeholder}
                  <Button
                    mini
                    onClick={() => handleCurrentTask(null, column._id, history)}
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
  );
};

//Styling part
const useStyles = makeStyles({
  root: {
    backgroundColor: "#F4F6FF",
    // minHeight: 50
    width: "300px",
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
  },
  cancel: {
    color: "grey"
  }
});

export default Column;
