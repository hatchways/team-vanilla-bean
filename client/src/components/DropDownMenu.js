import React, { useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../userContext";
import { deleteColumn, getDashboard } from "../utils/handleUpdateTasks";
import { useHistory, useLocation } from "react-router-dom";
import { setCurrentBoard } from "../AuthService";
import TitleInputModal from "../components/TitleInputModal";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { logout } from "../AuthService";
import { makeStyles } from "@material-ui/core/styles";
import { handleSuccess } from "../utils/handleAlerts";

export default function DropDownMenu(props) {
  const ITEM_HEIGHT = 48;
  const { column, blueNav, columnId, dashboardId, title, topNav } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const { value1, dashboardTitles } = useContext(UserContext);
  const [dbTitles] = dashboardTitles;
  let [, setTaskState] = value1;
  let history = useHistory();
  let dbTitlesArray = [];
  let dbIdArray = [];
  let options = [];

  const path = useLocation().pathname;
  const [calendarView] = useState(path.includes("/calendar") ? true : false);

  if (column) {
    options = ["Rename", "Delete"];
  } else if (blueNav) {
    for (let i = 0; i < dbTitles.length; i++) {
      dbTitlesArray.push(dbTitles[i].title);
      dbIdArray.push(dbTitles[i]._id);
    }
    options = dbTitlesArray;
  } else {
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
      handleSuccess(`The column has been deleted!`);
    });
    handleCloseDropDown();
  };

  const renameTrigger = () => {
    handleClickOpen();
    handleCloseDropDown();
  };

  const logoutTrigger = () => {
    logout();
  };

  const changeDbTrigger = dashboardId => {
    getDashboard(dashboardId, res => {
      setTaskState(res);
      handleCloseDropDown();
      setCurrentBoard(dashboardId);
      calendarView
        ? history.push(`/calendar/${dashboardId}`)
        : history.push(`/dashboards/${dashboardId}`);
    });
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
    Logout: logoutTrigger,
    BlueNav: changeDbTrigger
  };

  const useStyles = makeStyles(theme => ({
    icon: {
      marginLeft: 50,
      width: 50,
      height: 50
    }
  }));
  const classes = useStyles();

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        className={topNav ? classes.icon : ""}
        onClick={handleClickDropDown}
      >
        {topNav ? (
          <AccountCircleOutlinedIcon fontSize="large" />
        ) : (
          <MoreHorizIcon />
        )}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleCloseDropDown}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        {options ? (
          options.map((option, index) => {
            let onClick = onClickObject[option] || changeDbTrigger;
            let UDashboardId = dbIdArray[index];
            return (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={() => onClick(UDashboardId)}
              >
                <Typography>{option}</Typography>
              </MenuItem>
            );
          })
        ) : (
          <h1>no board exist</h1>
        )}
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
