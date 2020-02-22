import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: ["Monseratt", "sans-serif"],
    fontSize: 12,
    fontWeightRegular: 600,
    h1: {
      fontSize: 24,
      fontWeight: 500
    },
    h2: {
      fontSize: 15,
      fontWeight: 500
    }
  },
  palette: {
    primary: { main: "#759CFC" }
  },
  overrides: {
    MuiInputLabel: {
      outlined: {
        color: "black",
        textAlign: "center",
        "&$shrink": {
          width: "auto",
          color: "#759CFC"
        },
        width: "90%"
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "rgba(117,156,252,0.3)"
      },
      root: {
        fontWeight: 500,
        "&:hover $notchedOutline": {
          borderColor: "#759CFC"
        }
      }
    }
  }
});
