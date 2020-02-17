import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { main: "#DF1B1B" }
  },

  dashBoard: {
    display: "flex",
    justifyContent: "space-Between",
    width: "100%",
    maxWidth: 768,
    height: "100vh",
    overflow: "hidden",
    margin: "0 auto",
    padding: 15
  },

  column: {
    display: "flex",
    flexDirection: "column",
    minWidth: " 100px",
    backgroundColor: "red",
    padding: 15
  },

  itemOnDashBoard: {
    padding: "15px 25px",
    background: "#f3f3f3",
    cursor: "pointer",
    marginTop: "1000px",
    color: "red"
  }
});
