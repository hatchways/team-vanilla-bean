import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WebOutlinedIcon from "@material-ui/icons/WebOutlined";
import { UserContext } from "../userContext";
import logo from "../images/logo.png";
import profPic from "../images/profPic.png";
import BlueButton from "./BlueButton";
import AppBar from "@material-ui/core/AppBar";

const TopNav = () => {
  const { value1 } = useContext(UserContext);
  let [taskState] = value1;
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      height: 100,
      color: "#D3D3D3",
      backgroundColor: "white"
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
      width: 180,
      height: 50
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
            <WebOutlinedIcon className={classes.icon} />
            <Typography>Dashboard</Typography>
          </div>
          <div className={classes.item}>
            <CalendarTodayIcon className={classes.icon} />
            <Typography>Calender</Typography>
          </div>

          <BlueButton mini className={classes.btn}>
            <Typography>+ Create board</Typography>
          </BlueButton>
          <img src={profPic} className={classes.profPic} />
        </Grid>
      </Toolbar>
    </AppBar>

    // <Container maxWidth='xl'>
    //   <Grid
    //     position='static'
    //     container
    //     direction='row'
    //     alignItems='center'
    //     justify='space-between'
    //     className={classes.root}>
    // <img src={logo} />

    //     <div className={classes.wrapper}>
    //       <div className={classes.item}>
    //         <WebOutlinedIcon className={classes.icon} />
    //         <Typography>Dashboard</Typography>
    //       </div>
    //       <div className={classes.item}>
    //         <CalendarTodayIcon className={classes.icon} />
    //         <Typography>Calender</Typography>
    //       </div>
    //     </div>
    //     <div className={classes.wrapper}>
    //       <BlueButton mini className={classes.btn}>
    //         <Typography>+ Create board</Typography>
    //       </BlueButton>
    //       <img src={profPic} className={classes.profPic} />
    //     </div>
    //   </Grid>
    // </Container>
  );
};
export default TopNav;
