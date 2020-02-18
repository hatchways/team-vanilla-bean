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
    primary: { main: "#DF1B1B" },
    secondary: { main: "#759CFC" }
  }
});
