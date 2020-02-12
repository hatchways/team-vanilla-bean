import { makeStyles } from "@material-ui/core/styles";
import loginPic from "../images/login.png";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${loginPic})`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  paper: {
    marginTop: theme.spacing(16),
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: "60%"
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  button: {
    marginTop: theme.spacing(4),
    color: "white",
    fontWeight: 600,
    textTransform: "none"
  },
  inputLabel: {
    color: "black",
    textAlign: "center",
    width: "90%"
  }
}));

export default useStyles;
