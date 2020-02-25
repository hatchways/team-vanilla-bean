import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TaskCard from "./TaskCard";
//check how to use Cards in column data

//materialUi
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CancelIcon from "@material-ui/icons/Cancel";
import CreateCard from "./CreateCard/Modal";

//Drag and Drop
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = props => {
  const classes = useStyles(props);
  const [openCard, setOpenCard] = useState(false);
  const [selectedTask, setSelectedTask] = useState(false);

  const { column, tasks, createNew, index } = props;

  const [testSt, setTextSt] = useState({
    newTaskName: "",
    newColumnTitle: ""
  });
  const { newTaskName, newColumnTitle } = testSt;

  const onChange = e => {
    setTextSt({
      ...testSt,
      [e.target.name]: e.target.value
    });
  };

  const createNewColumn = e => {
    e.preventDefault();
    //Send newColumnTitle to create new column
  };

  const deleteColumn = e => {
    e.preventDefault();
    //Send newColumnTitle to create new column
  };

  //close card modal
  const closeCard = () => {
    setOpenCard(false);
  };

  const openCardModal = () => {
    setSelectedTask(null);
    setOpenCard(true);
  };

  const editCard = (open, id) => {
    setOpenCard(open);
    setSelectedTask(id);
  };

  if (createNew) {
    return (
      <Card className={classes.addColumn}>
        <CardContent>
          <TextField
            name="newColumnTitle"
            value={newColumnTitle}
            onChange={e => onChange(e)}
          >
            Enter column Name
          </TextField>
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
            onChange={e => createNewColumn(e)}
          >
            Create New column
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
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Typography
                    {...provided.dragHandleProps}
                    variant="h5"
                    className={classes.title}
                  >
                    {column.title}
                  </Typography>
                  <CancelIcon onClick={e => deleteColumn(e)} />
                </Grid>
                <Droppable droppableId={column.id} type="card">
                  {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          index={index}
                          editCard={editCard}
                        />
                      ))}
                      {provided.placeholder}
                      <Button
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                        onClick={openCardModal}
                      >
                        Add a card
                      </Button>
                      <CreateCard
                        open={openCard}
                        column={column.title}
                        selectedTask={selectedTask}
                        handleClose={closeCard}
                      />
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
    color: "white",
    textTransform: "none"
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
