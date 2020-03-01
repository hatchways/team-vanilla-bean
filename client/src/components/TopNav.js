import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WebOutlinedIcon from "@material-ui/icons/WebOutlined";
import { UserContext } from "../userContext";
import logo from "../images/logo.png";
import profPic from "../images/profPic.png";
import BlueButton from "./BlueButton";
import AppBar from "@material-ui/core/AppBar";
import AddIcon from "@material-ui/icons/Add";
import TitleInputModal from "../components/TitleInputModal";

const TopNav = () => {
  const { value1 } = useContext(UserContext);
  let [taskState] = value1;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dashboardTrigger = () => {
    //To do Redirect to the dashBoard
  };

  const calenderTrigger = () => {
    //To do Redirect to calender
  };

  const addNewBoard = () => {
    //To create new dashboard.
    // redirect to it.
  };

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      height: 100,
      color: "#D3D3D3",
      backgroundColor: "white",
      margin: 0,
      padding: 0
    },
    item: {
      color: "#D3D3D3",
      display: "flex",
      marginRight: 30,
      marginLeft: 30
    },
    wrapper: {
      display: "flex"
    },
    icon: {
      width: 18,
      height: 18
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
      <AppBar position='static' className={classes.root}>
        <Toolbar>
          <Grid
            position='static'
            container
            direction='row'
            alignItems='center'
            justify='space-between'
            className={classes.root}>
            <img src={logo} />
            <div className={classes.item}>
              <div className={classes.item}>
                <WebOutlinedIcon className={classes.icon} />
                <Typography>Dashboard</Typography>
              </div>
              <div className={classes.item}>
                <CalendarTodayIcon className={classes.icon} />
                <Typography>Calender</Typography>
              </div>
            </div>
            <div className={classes.item}>
              <BlueButton mini className={classes.btn} onClick={handleClickOpen}>
                <AddIcon />
                <Typography>Create board</Typography>
              </BlueButton>
              <img src={profPic} className={classes.profPic} />
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <TitleInputModal open={open} handleClose={handleClose} dashboard />
    </div>
  );
};
export default TopNav;
