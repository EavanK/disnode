import { makeStyles, createStyles } from "@mui/styles";

const drawerWidth = "100px";

// drawer opening transition
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

// drawer closing transition
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(35)} + 1px)`,
  },
});

export const useMemberStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    },
    drawerOpen: {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    },
    members: {
      display: "flex",
      flexDirection: "column",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        borderRadius: "30px",
        width: "2px",
      },
      "&::-webkit-scrollbar-track": {
        WebkitBoxShadow: "inset 0 0 3px rgb(0,0,0,0.1)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgb(0,0,0,0.3)",
        borderRadius: "30px",
      },
    },
    button: {
      cursor: "pointer",
      opacity: "0.7",
      "&:hover": {
        opacity: "1.0",
      },
    },
    role: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1em",
    },
    divider: {
      width: "85%",
      margin: "auto auto",
    },
  })
);
