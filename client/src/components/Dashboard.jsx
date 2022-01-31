import AuthContext from "../contexts/AuthContext";
import Home from "./Home";
import { HOME, SERVER } from "../utils/constants";
import { useContext } from "react";
import ServerContext from "../contexts/ServerContext";
import ServerList from "./ServerNavBar/ServerList";
import Server from "./Server";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles({
  main: {
    display: "flex",
    justifyContent: "space-between",
    width: `calc(100vw - 90px)`,
    height: "100vh",
    position: "absolute",
    left: "90px",
    top: "0",
    overflowX: "hidden",
    backgroundColor: "rgb(125, 116, 115,0.5)",
  },
  server: { display: "flex", maxHeight: "100vh" },
});
export default function Dashboard() {
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    app: { mode },
  } = useContext(ServerContext);
  const classes = useStyles();

  const tokens = JSON.parse(localStorage.getItem("DisnodeTokens"));

  return (
    <>
      <ServerList />
      <Box className={classes.main}>
        {!tokens && mode === HOME && <Login />}
        {mode === "REGISTER" && <Register />}
        {user && mode === HOME && <Home />}
        {mode === SERVER && <Server className={classes.server} />}
      </Box>
    </>
  );
}
