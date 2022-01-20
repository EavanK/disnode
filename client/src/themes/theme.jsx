import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          padding: "0px",
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto Mono",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: "Roboto Mono",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  palette: {
    mode: "dark",
  },
  // shadows: ["none"],
});
