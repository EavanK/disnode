import ServerListItem from "./ServerListItem";
import { useContext } from "react";
import NewServerDialog from "./Create/NewServerDialog";
import ServerContext from "../../contexts/ServerContext";
import SearchServerDialog from "./Search/SearchServerDialog";
import {
  List,
  IconButton,
  Tooltip,
  ListItem,
  Avatar,
  Box,
  Drawer,
  Divider,
} from "@mui/material";
import { CHANNEL_LEAVE, HOME, SERVER_LEAVE } from "../../utils/constants";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import ProfileMenu from "./Profile/ProfileMenu";
import AuthContext from "../../contexts/AuthContext";

const useStyles = makeStyles(() => ({
  navHome: {
    position: "sticky",
    top: "0px",
    zIndex: 1300,
    backgroundColor: "#040B0C",
    height: "78px",
  },
  navCreate: {
    zIndex: 1300,
    backgroundColor: "#040B0C",
    height: "56px",
  },
  navSearch: {
    zIndex: 1300,
    backgroundColor: "#040B0C",
    height: "56px",
  },
  navBot: {
    position: "sticky",
    bottom: "0px",
    left: "0px",
    marginTop: "auto",
    width: "90px",
    backgroundColor: "#040B0C",
  },
  nav: {
    height: "100vh",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    "& .MuiPaper-root": {
      width: "90px",
      backgroundColor: "#040B0C",
      position: "relative",
      minHeight: "100vh",
    },
  },
  list: {
    width: "100%",
    overflowY: "scroll",
    minHeight: "100vh",
    position: "relative",
    padding: "0 0",
    display: "flex",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      borderRadius: "30px",
      width: "0em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 3px rgb(0,0,0,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(0,0,0,0.3)",
      borderRadius: "30px",
    },
  },
  listItem: { padding: "0 0", justifyContent: "center", zIndex: 1300 },
  logo: {
    padding: "0 0",
    justifyContent: "center",
    zIndex: 1300,
    position: "sticky",
    top: "0px",
    backgroundColor: "#040B0C",
  },
  divider: {
    margin: "0em auto",
    width: "60%",
    height: ".2em",
    backgroundColor: "#FFFFFF",
    position: "sticky",
    zIndex: 1300,
  },
  home: { opacity: "0.5", "&:hover": { opacity: "1" } },
  selected: {
    opacity: "1",
  },
}));

export default function ServerList(props) {
  const {
    state: { socket, user },
  } = useContext(AuthContext);
  const {
    app: { servers, mode, loading, server, channel },
    setMode,
  } = useContext(ServerContext);
  const classes = useStyles();
  const homeIconClass = classNames(classes.home, {
    [classes.selected]: mode === HOME,
  });

  const handleHomeClick = () => {
    if (!user) return alert("Please login first");
    socket.emit("home click", socket.id, user.nickname);
    if (server.id && socket) socket.emit(SERVER_LEAVE, server.id);
    if (channel) socket.emit(CHANNEL_LEAVE, channel.id);
    setMode(HOME);
  };

  const parsedServers = servers.map((server) => {
    return (
      <ServerListItem
        key={server.id}
        id={server.id}
        title={server.title}
        logo={server.logo}
      />
    );
  });

  return (
    <Drawer variant="permanent" anchor="left" className={classes.nav}>
      <List className={classes.list}>
        <Tooltip title={"Home"} arrow placement="right">
          <ListItem className={classes.logo}>
            <IconButton
              className={homeIconClass}
              onClick={() => handleHomeClick(socket)}
              disableRipple
            >
              <Avatar
                style={{
                  width: "68px",
                  height: "68px",
                }}
                src="/images/Disnode-red.png"
              />
            </IconButton>
          </ListItem>
        </Tooltip>
        <Divider className={classes.divider} sx={{ top: "84px" }} />

        {parsedServers}

        {!loading && user && (
          <Box className={classes.navBot}>
            <Divider className={classes.divider} sx={{ bottom: "112px" }} />
            <ListItem className={classes.listItem}>
              <NewServerDialog />
              <SearchServerDialog />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ProfileMenu />
            </ListItem>
          </Box>
        )}
      </List>
    </Drawer>
  );
}
