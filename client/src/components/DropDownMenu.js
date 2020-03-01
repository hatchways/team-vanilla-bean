import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../userContext";
import { deleteColumn } from "../utils/handleUpdateTasks";

const ITEM_HEIGHT = 48;

export default function DropDownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { value1 } = useContext(UserContext);
  // let [taskState, setTaskState] = value1;
  // console.log(taskState);

  const dashboardId = "5e5b0b02be359a032d03ce2c";
  const { column, blueNav, columnId } = props;
  let options = [];
  if (column) {
    options = ["Rename", "Delete"];
  }
  if (blueNav) {
    options = ["Logout"];
  }
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteColumnTrigger = () => {
    deleteColumn(dashboardId, columnId, res => {
      // setTaskState(res);
    });
    handleClose();
  };

  const renameColumn = () => {
    console.log("rename");

    handleClose();
  };

  const logout = () => {
    console.log("logout");
  };

  const onClickObject = { Rename: renameColumn, Delete: deleteColumnTrigger, Logout: logout };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}>
        {options.map(option => {
          let onClick = onClickObject[option];
          console.log(onClick);
          return (
            <MenuItem key={option} selected={option === "Pyxis"} onClick={onClick}>
              <Typography>{option}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
