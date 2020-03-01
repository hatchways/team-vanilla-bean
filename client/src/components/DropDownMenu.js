import React, { useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../userContext";
import { deleteColumn } from "../utils/handleUpdateTasks";
import { logout } from "../AuthService";

import TitleInputModal from "../components/TitleInputModal";

export default function DropDownMenu(props) {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const { value1 } = useContext(UserContext);
  let [, setTaskState] = value1;

  const { column, blueNav, columnId, dashboardId, title } = props;
  let options = [];

  if (column) {
    options = ["Rename", "Delete"];
  }
  if (blueNav) {
    options = ["Logout"];
  }
  const handleClickDropDown = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropDown = () => {
    setAnchorEl(null);
  };

  const deleteColumnTrigger = () => {
    deleteColumn(dashboardId, columnId, res => {
      setTaskState(res);
    });
    handleCloseDropDown();
  };

  const renameTrigger = () => {
    handleClickOpen();
    handleCloseDropDown();
  };

  const logoutTrigger = e => {
    logout();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const onClickObject = {
    Rename: renameTrigger,
    Delete: deleteColumnTrigger,
    Logout: logoutTrigger
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClickDropDown}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleCloseDropDown}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}>
        {options.map(option => {
          let onClick = onClickObject[option];
          return (
            <MenuItem key={option} selected={option === "Pyxis"} onClick={e => onClick(e)}>
              <Typography>{option}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
      <TitleInputModal
        open={openModal}
        handleClose={handleClose}
        columnId={columnId}
        columnTitle={title}
        column
      />
    </div>
  );
}
