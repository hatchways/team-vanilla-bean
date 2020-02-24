import React from "react";
import {
  Box,
  Container,
  Dialog,
  Button,
  List,
  ListItem,
  TextField,
  ListSubheader,
  TextareaAutosize,
  Divider,
  Paper,
  ListItemText,
  ListItemIcon,
  DialogContent,
  IconButton,
  Grid,
  Icon,
  Typography,
  DialogTitle,
  Link
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import BlueButton from "./BlueButton";

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);

  //TO DO: If no previous board set to Open
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //TODO: make API call
    handleClose();
  };

  const useStyles = makeStyles(theme => ({
    root: {
      width: "70%",
      paddingBottom: "3%"
    },
    closeButton: {
      position: "absolute",
      top: 1,
      right: 1,
      color: theme.palette.grey[500]
    },
    text: {
      verticalAlign: "middle"
    },
    icon: {
      float: "left",
      paddingRight: "2%"
    },
    header: {
      marginBottom: theme.spacing(2),
      paddingBottom: "3%",
      borderBottom: "2px rgba(117,156,252, 0.1) solid"
    },
    input: {
      width: "90%"
    },
    buttonList: {
      marginLeft: "5%"
    },
    miniButton: {
      backgroundColor: "#F4F6FF",
      color: "#B5C0D9",
      marginBottom: "5%",
      textTransform: "none"
    }
  }));

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        className: classes.root
      }}
    >
      <DialogContent>
        <Grid container>
          <Grid item xs={12} className={classes.header}>
            <IconButton
              onClick={handleClose}
              className={classes.closeButton}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <AssignmentOutlinedIcon
              className={classes.icon}
              color="primary"
              fontSize="large"
            />
            <Typography className={classes.text} variant="h2" display="inline">
              Midterm exam
            </Typography>
            <Typography display="block" color="secondary" variant="subtitle2">
              In list "Math"
            </Typography>
          </Grid>

          <Grid item xs={10} container spacing={4}>
            <Grid item container>
              <Grid item xs={1}>
                <MenuBookOutlinedIcon color="primary" />
              </Grid>

              <Grid item xs={11}>
                <Typography className={classes.text} variant="h3" gutterBottom>
                  Description:
                </Typography>
                <TextField
                  placeholder="Add description..."
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                />
                <BlueButton size="small" height="auto" width="auto" none>
                  Save
                </BlueButton>
                <IconButton color="primary" aria-label="close">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>

            <Grid item container>
              <Grid item xs={1}>
                <AccessTimeIcon color="primary" />
              </Grid>

              <Grid item xs={11}>
                <Typography gutterBottom className={classes.text} variant="h3">
                  Deadline:
                </Typography>
                <Link variant="subtitle2" underline="always">
                  March 10
                </Link>
              </Grid>
            </Grid>

            <Grid item container>
              <Grid item xs={1}>
                <ChatBubbleOutlineOutlinedIcon color="primary" />
              </Grid>

              <Grid item xs={11}>
                <Typography className={classes.text} variant="h3" gutterBottom>
                  Add comment:
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Write a comment..."
                  multiline
                  rows={2}
                  fullWidth
                />
                <BlueButton size="small" height="auto" width="auto" none>
                  Save
                </BlueButton>
                <IconButton color="primary" aria-label="close">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} className={classes.buttonList} container>
            <Grid item>
              <Typography color="secondary" variant="caption">
                ADD TO CARD:
              </Typography>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className={classes.miniButton}
                disableElevation
              >
                Tag
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className={classes.miniButton}
                disableElevation
              >
                Check-list
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className={classes.miniButton}
                disableElevation
              >
                Deadline
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className={classes.miniButton}
                disableElevation
              >
                Attachment
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className={classes.miniButton}
                disableElevation
              >
                Cover
              </Button>
            </Grid>
            <Grid item>
              <Typography color="secondary" variant="caption">
                ACTIONS:
              </Typography>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className={classes.miniButton}
                disableElevation
              >
                Move
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className={classes.miniButton}
                disableElevation
              >
                Copy
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className={classes.miniButton}
                disableElevation
              >
                Share
              </Button>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className={classes.miniButton}
                disableElevation
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
