import React, { useState } from "react";

import ControlPoint from "@material-ui/icons/ControlPoint";
import Card from "@material-ui/core/Card";
import CreateBoardColumn from "./CreateBoardColumn";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const CreateColumnButton = props => {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const { position, isDraggingOver } = props;

  console.log(isDraggingOver);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Card
        className={isDraggingOver ? classes.isDraggingOver : classes.addColumn}
        onClick={handleClickOpen}>
        <CardContent>
          <ControlPoint className={classes.plusIcon} />
        </CardContent>
      </Card>
      <CreateBoardColumn open={open} handleClose={handleClose} position={position} />
    </div>
  );
};

const useStyles = makeStyles({
  addColumn: {
    backgroundColor: "#D3D3D3",
    minHeight: "400px",
    maxWidth: "100px",
    overflow: "hidden",
    color: "white",
    textAlign: "left",
    lineHeight: "normal",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.2s",
    opacity: 0,
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
      color: "white"
    }
  },
  isDraggingOver: {
    backgroundColor: "red",
    opacity: 0
  },
  plusIcon: {
    fontSize: 50
  }
});

export default CreateColumnButton;
