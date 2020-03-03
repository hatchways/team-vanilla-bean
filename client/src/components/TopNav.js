import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WebOutlinedIcon from "@material-ui/icons/WebOutlined";
import logo from "../images/logo.png";
import BlueButton from "./BlueButton";
import AppBar from "@material-ui/core/AppBar";
import AddIcon from "@material-ui/icons/Add";
import TitleInputModal from "../components/TitleInputModal";
import { UserContext } from "../userContext";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { useHistory } from "react-router-dom";

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const { topNavState } = useContext(UserContext);
  let [isInDashboard] = topNavState;
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dashboardTrigger = () => {
    history.push("/dashboards");
  };

  const calendarTrigger = () => {
    history.push("/calendar");
  };

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      height: 100,
      color: "#545454",
      backgroundColor: "white",
      padding: "0px 25px"
    },
    itemActive: {
      color: "#759CFC",
      display: "flex",
      fontSize: " 20px",
      marginRight: 30,
      marginLeft: 30,
      "&:hover": {
        cursor: "pointer"
      }
    },
    itemInactive: {
      display: "flex",
      fontSize: " 20px",
      marginRight: 30,
      marginLeft: 30,
      "&:hover": {
        cursor: "pointer"
      }
    },
    wrapper: {
      display: "flex"
    },
    icon: {
      width: 18,
      height: 18,
      marginRight: 10
    },
    btn: {
      color: "white",
      backgroundColor: "#759CFC"
    },
    profPic: {
      height: 50,
      width: 50,
      borderRadius: 100,
      marginLeft: 50
    }
  }));
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid
            position="static"
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            className={classes.root}
          >
            <img src={logo} alt="logo" />
            <div className={classes.wrapper}>
              <div
                className={
                  isInDashboard ? classes.itemActive : classes.itemInactive
                }
                onClick={dashboardTrigger}
              >
                <WebOutlinedIcon className={classes.icon} />
                <Typography>Dashboard</Typography>
              </div>
              <div
                className={
                  isInDashboard ? classes.itemInactive : classes.itemActive
                }
                onClick={calendarTrigger}
              >
                <CalendarTodayIcon className={classes.icon} />
                <Typography>Calendar</Typography>
              </div>
            </div>
            <div className={classes.wrapper}>
              <BlueButton
                mini
                className={classes.btn}
                onClick={handleClickOpen}
              >
                <AddIcon className={classes.icon} />
                <Typography>Create board</Typography>
              </BlueButton>
              <AccountCircleOutlinedIcon className={classes.profPic} />
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <TitleInputModal open={open} handleClose={handleClose} dashboard />
    </div>
  );
};
export default TopNav;
